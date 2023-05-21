import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesFilters.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { Input } from '@/shared/ui/redesigned/Input';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Button } from '@/shared/ui/redesigned/Button';
import { getRouteArticleCreate } from '@/shared/const/router';
import { AppLinkTheme, AppLink } from '@/shared/ui/deprecated/AppLink';
import { getUserAuthData } from '@/entities/User';
import { useSelector } from 'react-redux';
import { UserRole } from '@/entities/Users/model/consts/userConsts';

interface ArticlesFiltersProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    type: ArticleType;
    search: string;
    onChangeSearch: (value: string) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
    onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
    const {
        className,
        onChangeType,
        onChangeSearch,
        search,
        onChangeSort,
        sort,
        onChangeOrder,
        order,
        type,
    } = props;
    const { t } = useTranslation();
    const userData = useSelector(getUserAuthData);

    return (
        <Card
            className={classNames(cls.ArticlesFilters, {}, [className])}
            padding="24"
        >
            <VStack gap="32">
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    size="s"
                    placeholder={t('Поиск')}
                    addonLeft={<Icon Svg={SearchIcon} />}
                />
                <ArticleTypeTabs
                    value={type}
                    onChangeType={onChangeType}
                    className={cls.tabs}
                />
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
            </VStack>
            {userData?.roles?.includes(UserRole.ADMIN) && <Button className={cls.buttonCreate}>
                        <AppLink
                            to={getRouteArticleCreate()}
                            theme={AppLinkTheme.SECONDARY}
                            className={cls.createBtn}
                        >
                                {t('Создать новую статью')}
                        </AppLink>
            </Button>}
        </Card>
    );
});
