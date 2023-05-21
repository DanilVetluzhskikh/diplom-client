import { Text } from "@/shared/ui/redesigned/Text"
import { Users } from "../model/types/users"
import classes from './style.module.scss'
import { Avatar } from "@/shared/ui/redesigned/Avatar"
import { Button } from "@/shared/ui/redesigned/Button"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { deleteUser } from "../model/services/deleteUser"
import { useTranslation } from "react-i18next"

interface UserProps {
    user: Users[0]
    selectUser: (user: Users[0]) => void
}

export const User = (props: UserProps) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation();

    const {user: {
        id,
        username,
        avatar,
        roles,
        ...otherUserProps
    }, selectUser} = props

    const handleDelete = () => {
        dispatch(deleteUser(id))
    }

    return (
        <div className={classes.item}>
            <Text text={`ID - ${id}`} />
            <Avatar src={avatar} size={80} />
            <Text text={username} />
            {roles?.map((role) => <Text text={role} key={role} />)}
            <div className={classes.actions}>
                <Button color="error" onClick={handleDelete}>{t('Удалить')}</Button>
                <Button onClick={() => selectUser({id, username, avatar, roles, ...otherUserProps})}>{t('Назначить роль')}</Button>
            </div>
        </div>
    )
}