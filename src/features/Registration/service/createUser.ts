import {$api} from '@/shared/api/api'

export const createUser = async (username: string, password: string) => {
    try {
        const result = await $api.post('/users', {
            username,
            password,
            roles: [
              "USER"
            ],
            features: {
              "isArticleRatingEnabled": true,
              "isCounterEnabled": true,
              "isAppRedesigned": true
            },
            avatar: "",
            jsonSettings: {}
        })

        await $api.post('/profile', {
            first: "",
            lastname: "",
            age: 0,
            currency: "",
            country: "",
            city: "",
            username,
            avatar: result.data.avatar,
            id: result.data.id
        })

        return result.data
    } catch (e) {
        return e
    }
}