import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Users } from '@/entities/Users';
import { $api } from '@/shared/api/api';
import { Text } from '@/shared/ui/redesigned/Text';
import { Article } from '@/entities/Article';
import { Loader } from '@/shared/ui/deprecated/Loader';
import cls from './style.module.scss'
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Link } from 'react-router-dom';
import { UserRole, getUserAuthData } from '@/entities/User';
import { useSelector } from 'react-redux';

const AdminPanelPage = () => {
    const { t } = useTranslation('');
    const [articles, setArticles] = useState<Article[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const userData = useSelector(getUserAuthData);

    if(!userData?.roles?.includes(UserRole.ADMIN)) {
        return <Text text={`${t('У вас нет доступа к этой странице')}`} />
    }

    const handleDelete = async (id: string) => {
        setIsLoading(true)
        await $api.delete(
            `/articles/${id}`,
        );

        setArticles((prev) => prev.filter((i) => i.id !== id))

        setIsLoading(false)
    }

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const result = await $api.get('/articles')

            setArticles(result.data)
            setIsLoading(false)
        })()
    }, [])

    return (
        <Page data-testid="AdminPanelPage">
            {t('Админ панель')}
            <Users />
                <div className={cls.articlesBlock}>
                <Text text={t('Статьи')} variant='accent' />
                {isLoading ? <Loader /> : articles.map((art) => (
                        <div key={art.id} className={cls.item}>
                            <Text text={`ID - ${art.id}`} />
                            <Text text={art.title} />
                            <Avatar src={art.img} size={80} />
                            <div className={cls.actions}>
                                <Button onClick={() => handleDelete(art.id)} color="error">{t('Удалить')}</Button>
                                <Button>
                                    <Link to={`/articles/${art.id}`}>{t('Открыть')}</Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
        </Page>
    );
};

export default AdminPanelPage;
