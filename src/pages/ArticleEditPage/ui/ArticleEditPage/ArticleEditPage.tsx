import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleEditPage.module.scss';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';
import { createArticle, typesArticle, variantBlocks } from './const';
import { Button } from '@/shared/ui/redesigned/Button';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { BlockText } from './BlockText';
import { BlockCode } from './BlockCode';
import { BlockImage } from './BlockImage';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { useSelector } from 'react-redux';
import { UserRole, getUserAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { articlesPageActions } from '@/pages/ArticlesPage/model/slices/articlesPageSlice';

interface ArticleEditPageProps {
    className?: string;
}

export type BlockVariant = {
    type: "TEXT",
    id: string,
    title: string,
    paragraphs: string[]
} | {
    type: "CODE",
    id: string,
    code: string
} | {
    type: "IMAGE",
    id: string,
    src: string,
    title: string,
}

export type TYPE_BLOCK = "TEXT" | "IMAGE" | "CODE"

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
    const userData = useSelector(getUserAuthData);
    const { t } = useTranslation();


    if(!userData?.roles?.includes(UserRole.ADMIN)) {
        return <Text text={`${t('У вас нет доступа к этой странице')}`} />
    }

    const { className } = props;

    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')
    const [img, setImg] = useState('')
    const [types, setTypes] = useState<string[]>([])
    const [error, setError] = useState('')
    const [isSuccess, setIsSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [blocks, setBlocks] = useState<BlockVariant[]>([])
    const [currentBlock, setCurrentBlock] = useState<TYPE_BLOCK>('TEXT')
    const dispatch = useAppDispatch()

    const handleAddBlock = () => {
        if(currentBlock === 'TEXT') {
            setBlocks((prev) => {
                return [...prev, {
                    type: currentBlock,
                    id: Math.random().toString(),
                    paragraphs: [],
                    title: '',
                }]
            })
        } else if (currentBlock === 'IMAGE') {
            setBlocks((prev) => {
                return [...prev, {
                    type: currentBlock,
                    id: Math.random().toString(),
                    src: '',
                    title: '',
                }]
            })
        } else if (currentBlock === 'CODE') {
            setBlocks((prev) => {
                return [...prev, {
                    type: currentBlock,
                    id: Math.random().toString(),
                    code: ''
                }]
            })
        } else {
            return null
        }

        setCurrentBlock('TEXT')
    }

    const handleDeleteBlock = (index: number) => {
        setBlocks((prev) => {
            return prev.filter((_, filterIndex) => index !== filterIndex)
        })
    }

    const handleCreateBlock = async () => {
        setError('')

        const textTitles = blocks.find((t) => t.type === 'TEXT' && !t.title.trim().length)
        const textPar = blocks.find((t) => t.type === 'TEXT' && (t.paragraphs.filter((p) => !p.trim().length).length || !t.paragraphs.length))

        const codeCode = blocks.find((t) => t.type === 'CODE' && !t.code.trim().length)

        const imageTitles = blocks.find((t) => t.type === 'IMAGE' && !t.title.trim().length)
        const imageSrc = blocks.find((t) => t.type === 'IMAGE' && !t.src.trim().length)

        if(!blocks.length) {
            return setError(t('Блоки не могут быть пустыми'))
        }
        
        if(!title.trim().length) {
            return setError(t('Заполните заголовок статьи'))
        }

        if(!subTitle.trim().length) {
            return setError(t('Заполните подзаголовок статьи'))
        }

        if(!img.trim().length) {
            return setError(t('Заполните картинку статьи'))
        }

        if(!types.length) {
            return setError(t('Выберите типы статьи'))
        }

        if(textTitles) {
            return setError(t('Заполните все заголовки у текстовых блоков'))
        }

        if(textPar) {
            return setError(t('Заполните все параграфы у текстовых блоков'))
        }

        if(codeCode) {
            return setError(t('Напишите код у кодовых блоков'))
        }

        if(imageTitles) {
            return setError(t('Заполните все заголоки у картинных блоков'))
        }

        if(imageSrc) {
            return setError(t('Заполните все пути до фоток у картинных блоков'))
        }

        setIsLoading(true)
        const result = await createArticle(
            title, 
            subTitle, 
            img, 
            userData?.id ?? '', 
            types, 
            blocks,
        )

        if(result) {
            setIsSuccess('Статья успешно создана')
            setTitle('')
            setSubTitle('')
            setImg('')
            setTypes([])
            setBlocks([])

            dispatch(articlesPageActions.addArticle({
                ...result,
                user: {
                    ...userData
                }
            }))
        }

        setIsLoading(false)
    }

    if(isLoading) {
        return <Loader />
    }

    return (
        <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
            <Text text={t('Создание новой статьи')} size='l' />
            <div className={cls.blockInput}>
                <Text text={t('Название Статьи')} />
                <Input
                    value={title}
                    onChange={(value) => setTitle(value)}
                    className={cls.input}
                />
            </div>
            <div className={cls.blockInput}>
                <Text text={t('Подзаголовок статьи')} />
                <Input
                    value={subTitle}
                    onChange={(value) => setSubTitle(value)}
                    className={cls.input}
                />
            </div>
            <div className={cls.blockInputImg}>
                <div className={cls.imgBlockInput}>
                    <Text text={t('Аватар статьи')} />
                    <Input
                        value={img}
                        onChange={(value) => setImg(value)}
                        className={cls.input}
                    />
                </div>
                {!!img.length && (
                    <img src={img} className={cls.img} />
                )}
            </div>
            <div className={cls.blockInput}>
                <Text text={t('Типы статьи')} />
                <div className={cls.types}>
                    {typesArticle.map((item) => (
                        <Button
                            key={item}
                            className={types.includes(item) ? cls.itemTypeSelect : cls.itemType}
                            onClick={() => {
                                setTypes((prev) => {
                                    if(types.includes(item)) {
                                        return prev.filter((i) => i !== item)
                                    } else {
                                        return [...prev, item] 
                                    }
                                })
                            }}
                        >{item}</Button>
                    ))}
                </div>
            </div>
            {blocks.map((item, index) => {
                if(item.type === 'TEXT') {
                    return <BlockText 
                        handleDeleteBlock={() => handleDeleteBlock(index)}
                        title={item.title} 
                        paragraphs={item.paragraphs} 
                        key={`${item}__${index}`}
                        setTitle={(value: string) => {
                            setBlocks((prev) => {
                                return prev.map((item, mapIndex) => {
                                    if(mapIndex === index && item.type === 'TEXT') {
                                        item.title = value
                                        return item
                                    } else {
                                        return item
                                    }
                                })
                            })
                        }}
                        setParagraphs={(value: string[]) => {
                            setBlocks((prev) => {
                                return prev.map((item, mapIndex) => {
                                    if(mapIndex === index && item.type === 'TEXT') {
                                        item.paragraphs = value
                                        return item
                                    } else {
                                        return item
                                    }
                                })
                            })
                        }}
                    />
                } else if (item.type === 'CODE') {
                    return (
                        <BlockCode 
                            handleDeleteBlock={() => handleDeleteBlock(index)}
                            code={item.code} 
                            key={`${item}__${index}`}
                            setCode={(value: string) => {
                                setBlocks((prev) => {
                                    return prev.map((item, mapIndex) => {
                                        if(mapIndex === index && item.type === 'CODE') {
                                            item.code = value
                                            return item
                                        } else {
                                            return item
                                        }
                                    })
                                })
                            }}
                        />
                    )
                } else if (item.type === 'IMAGE') {
                    return (
                        <BlockImage 
                            handleDeleteBlock={() => handleDeleteBlock(index)}
                            img={item.src} 
                            key={`${item}__${index}`}
                            setImg={(value: string) => {
                                setBlocks((prev) => {
                                    return prev.map((item, mapIndex) => {
                                        if(mapIndex === index && item.type === 'IMAGE') {
                                            item.src = value
                                            return item
                                        } else {
                                            return item
                                        }
                                    })
                                })
                            }}
                            title={item.title}
                            setTitle={(value: string) => {
                                setBlocks((prev) => {
                                    return prev.map((item, mapIndex) => {
                                        if(mapIndex === index && item.type === 'IMAGE') {
                                            item.title = value
                                            return item
                                        } else {
                                            return item
                                        }
                                    })
                                })
                            }}
                        />
                    )
                }
            })}
            <div className={cls.blockInput}>
                <Text text={t('Добавить блок')} />
                <ListBox
                    className={cls.blocks}
                    items={variantBlocks}
                    value={currentBlock}
                    onChange={(value) => setCurrentBlock(value)}
                />
                <Button onClick={handleAddBlock}>{t('Добавить')}</Button>
            </div>

            <Button onClick={handleCreateBlock} className={cls.createBtn}>{t('Создать статью')}</Button>
            {!!error.length && <Text text={error} variant='error' />}
            {!!isSuccess.length && <Text text={isSuccess} />}
        </Page>
    );
});

export default ArticleEditPage;
