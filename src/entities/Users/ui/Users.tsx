import { useEffect, useState } from "react"
import { getUsers } from "../model/services/getUsers"
import { useSelector } from "react-redux"
import { getUsersIsLoading, getUsersState } from "../model/slice/usersSlice"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import classes from './style.module.scss'
import { User } from "./User"
import { Text } from "@/shared/ui/redesigned/Text"
import { useTranslation } from "react-i18next"
import { Loader } from "@/shared/ui/deprecated/Loader"
import { Modal } from "@/shared/ui/redesigned/Modal"
import { Select } from "@/shared/ui/deprecated/Select"
import { Roles, UserRole } from "../model/consts/userConsts"
import { Button } from "@/shared/ui/redesigned/Button"
import { Users as UsersType } from "../model/types/users"
import { updateUser } from "../model/services/updateUser"

export const Users = () => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation();

    const [selectedUser, setSelectedUser] = useState<UsersType[0] | null>(null)
    const [role, setRole] = useState('')
    const users = useSelector(getUsersState)
    const isLoading = useSelector(getUsersIsLoading)

    const changeUser = () => {
        if(selectedUser) {
            dispatch(updateUser({
                user: {
                    ...selectedUser,
                    roles: [role as UserRole]
                },
            }))

            setSelectedUser(null)
            setRole('')
        }
    }

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    useEffect(() => {
        if(selectedUser) {
            setRole(selectedUser.roles[0])
        }
    }, [JSON.stringify(selectedUser)])

    return (
        <div className={classes.list}>
            <Text text={t('Пользователи')} variant='accent' />
            {isLoading ? <Loader /> : users.map((user) => (
                <User key={user.id} user={user} selectUser={setSelectedUser}/>
            ))}
            <Modal isOpen={Boolean(selectedUser)} onClose={() => setSelectedUser(null)}>
                <div className={classes.modalContent}>
                    <Text text={t('Назначить роль для пользователя с') + ` ID ${selectedUser?.id}`} />
                    <Select 
                        options={Roles} 
                        value={role}
                        onChange={(value) => setRole(value)}
                    />
                    <Button onClick={changeUser}>{t('Назначить')}</Button>
                </div>
            </Modal>
        </div>
    )
}