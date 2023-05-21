import { Input } from "@/shared/ui/redesigned/Input"
import { Text } from "@/shared/ui/redesigned/Text"
import { useTranslation } from "react-i18next"
import cls from './ArticleEditPage.module.scss'
import { Button } from "@/shared/ui/redesigned/Button";

interface BlockProps {
    title: string;
    setTitle: (title: string) => void;
    img: string;
    setImg: (img: string) => void
    handleDeleteBlock: () => void
}

export const BlockImage = (props: BlockProps) => {
    const {title, handleDeleteBlock, setTitle, img, setImg} = props
    const { t } = useTranslation();

    return (
        <div className={cls.blockItemText}>
            <Text className={cls.titleTextBlock} text={t('БЛОК КАРТИНКА')} size='l' />
            <Input 
                placeholder={t('Заголовок блока')} 
                value={title}
                onChange={(value) => setTitle(value)}
            />
            <div className={cls.blockImgBlock}>
                <Input 
                    className={cls.paragraphInput}
                    placeholder={t('Ссылка на картинку')} 
                    value={img}
                    onChange={(value) => setImg(value)}
                />
                {!!img.length && (
                    <img src={img} className={cls.imgBlock} />
                )}
            </div>
            <Button onClick={handleDeleteBlock} style={{marginTop: '15px'}}>{t('Удалить')}</Button>
        </div>
    )
}