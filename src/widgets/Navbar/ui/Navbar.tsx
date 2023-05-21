import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { LoginModal } from '@/features/AuthByUsername';
import { UserRole, getUserAuthData } from '@/entities/User';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropdown } from '@/features/avatarDropdown';
import cls from './Navbar.module.scss';
import { getRouteArticleCreate } from '@/shared/const/router';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';
import { RegistationModal } from '@/features/Registration/RegistrationModal';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const [isRegModal, setIsRegModal] = useState(false);
    const authData = useSelector(getUserAuthData);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onCloseRegModal = useCallback(() => {
        setIsRegModal(false);
    }, []);

    const onShowRegModal = useCallback(() => {
        setIsRegModal(true);
    }, []);

    const onSuccessReg = useCallback(() => {
        setTimeout(() => {
            setIsRegModal(false);
            setIsAuthModal(true);
        }, 1500)
    }, []);

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.NavbarRedesigned,
        off: () => cls.Navbar,
    });

    if (authData) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <header className={classNames(mainClass, {}, [className])}>
                        <HStack gap="16" className={cls.actions}>
                            <NotificationButton />
                            <AvatarDropdown />
                        </HStack>
                    </header>
                }
                off={
                    <header className={classNames(mainClass, {}, [className])}>
                        <Text
                            className={cls.appName}
                            title={t('Dan App')}
                            theme={TextTheme.INVERTED}
                        />
                        {authData.roles?.includes(UserRole.ADMIN) && <AppLink
                            to={getRouteArticleCreate()}
                            theme={AppLinkTheme.SECONDARY}
                            className={cls.createBtn}
                        >
                            {t('Создать статью')}
                        </AppLink>}
                        <HStack gap="16" className={cls.actions}>
                            <NotificationButton />
                            <AvatarDropdown />
                        </HStack>
                    </header>
                }
            />
        );
    }

    return (
        <header className={classNames(mainClass, {}, [className])}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <>
                        <Button
                            variant="clear"
                            className={cls.links}
                            onClick={onShowModal}
                        >
                            {t('Войти')}
                        </Button>
                        <Button
                            variant="clear"
                            className={cls.links}
                            onClick={onShowRegModal}
                        >
                            {t('Зарегистрироваться')}
                        </Button>
                    </>
                }
                off={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            width: '100%'
                        }}
                    >
                        <ButtonDeprecated
                            theme={ButtonTheme.CLEAR_INVERTED}
                            className={cls.links}
                            onClick={onShowModal}
                        >
                            {t('Войти')}
                        </ButtonDeprecated>
                        <ButtonDeprecated
                            theme={ButtonTheme.CLEAR_INVERTED}
                            className={cls.links}
                            onClick={onShowRegModal}
                        >
                            {t('Зарегистрироваться')}
                        </ButtonDeprecated>
                    </div>
                }
            />

            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            )}
            {isRegModal && (
                <RegistationModal onSuccessReg={onSuccessReg} isOpen={isRegModal} onClose={onCloseRegModal} />
            )}
        </header>
    );
});
