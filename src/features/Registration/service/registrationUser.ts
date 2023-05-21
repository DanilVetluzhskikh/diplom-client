import {$api} from '@/shared/api/api'

export const regUser = async (username: string, password: string) => {
    try {
        const result = await $api.post<string>('/registration', {
            username,
            password,
        })

        return result.data
    } catch (e) {
        return e
    }
}