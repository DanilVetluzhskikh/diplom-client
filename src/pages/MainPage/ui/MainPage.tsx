import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Text } from '@/shared/ui/redesigned/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text';
import { TextSize } from '@/shared/ui/deprecated/Text';
import { TextTheme } from '@/shared/ui/deprecated/Text';
import styles from './style.module.scss'

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <Page data-testid="MainPage">
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<Text variant='accent' size='l' text={t('Главная страница')} align='center' />}
                off={
                    <TextDeprecated
                        theme={TextTheme.PRIMARY}
                        align={TextAlign.CENTER}
                        size={TextSize.L}
                        text={t('Главная страница')}
                    />
                }
            />
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<Text className={styles.about} variant='primary' size='l' text={t('О главной странице')} />}
                off={
                    <TextDeprecated
                        theme={TextTheme.PRIMARY}
                        align={TextAlign.LEFT}
                        size={TextSize.L}
                        text={t('О главной странице')}
                        className={styles.about}
                    />
                }
            />
        </Page>
    );
};

export default MainPage;
