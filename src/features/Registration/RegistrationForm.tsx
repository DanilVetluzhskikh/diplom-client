import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import {
    DynamicModuleLoader,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import cls from './style.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { regUser } from './service/registrationUser';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { createUser } from './service/createUser';

export interface RegistrationFormProps {
    className?: string;
    onSuccess: () => void;
}

export const RegistrationForm = memo(({ className, onSuccess }: RegistrationFormProps) => {
    const { t } = useTranslation();

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    
    const handleRegistration = async () => {
        setError('')
        setSuccess('')
        setLoading(true)

        if(!userName.trim()) {
            setLoading(false)
            return setError('Заполните поле username')
        }

        if(!password.trim()) {
            setLoading(false)
            return setError('Заполните поле password')
        }

        const result = await regUser(userName, password)
        
        if(Boolean(Number(result))) {
            const user = await createUser(userName, password)

            setLoading(false)

            if(user?.username === userName) {
                setSuccess('Регистрация прошла успешно, подождите переключаем вас на другое модальное окно')
                onSuccess()
            } else {
                setError('Ошибка, попробуйте позже')
            }
        } else {
            setLoading(false)
            return setError('Пользователь с таким username уже существует')
        }
    }

    if(loading) {
        return <Loader />
    }

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={{} as any}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <VStack
                        gap="16"
                        className={classNames(cls.RegForm, {}, [className])}
                    >
                        <Text title={t('Форма регистрации')} />
                        {error && (
                            <Text
                                text={error}
                                variant="error"
                            />
                        )}
                        {success && (
                            <Text
                                text={success}
                                variant="accent"
                            />
                        )}
                        <Input
                            autofocus
                            type="text"
                            className={cls.input}
                            placeholder={t('Введите username')}
                            value={userName}
                            onChange={(value) => setUserName(value)}
                        />
                        <Input
                            type="password"
                            className={cls.input}
                            placeholder={t('Введите пароль')}
                            value={password}
                            onChange={(value) => setPassword(value)}
                        />
                        <Button
                            className={cls.regBtn}
                            onClick={handleRegistration}
                        >
                            {t('Зарегистрироваться')}
                        </Button>
                    </VStack>
                }
                off={
                    <div className={classNames(cls.RegForm, {}, [className])}>
                        <TextDeprecated title={t('Форма авторизации')} />
                        {error && (
                            <TextDeprecated
                                text={error}
                                theme={TextTheme.ERROR}
                            />
                        )}
                        {success && (
                            <Text
                                text={success}
                                variant="accent"
                            />
                        )}
                        <InputDeprecated
                            autofocus
                            type="text"
                            className={cls.input}
                            placeholder={t('Введите username')}
                            value={userName}
                            onChange={(value) => setUserName(value)}
                        />
                        <InputDeprecated
                            type="password"
                            className={cls.input}
                            placeholder={t('Введите пароль')}
                            value={password}
                            onChange={(value) => setPassword(value)}
                        />
                        <ButtonDeprecated
                            theme={ButtonTheme.OUTLINE}
                            className={cls.regBtn}
                            onClick={handleRegistration}
                        >
                            {t('Зарегистрироваться')}
                        </ButtonDeprecated>
                    </div>
                }
            />
        </DynamicModuleLoader>
    );
});

