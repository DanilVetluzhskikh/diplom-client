import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Users } from "../types/users";

export const getUsers = createAsyncThunk<
    Users,
    undefined,
    ThunkConfig<string>
>('users/get', async (_, thunkApi) => {
    const { rejectWithValue, extra } = thunkApi;

    try {
        const response = await extra.api.get<Users>(
            `/users`,
        );

        return response.data
    } catch (e) {
        console.log(e);
        return rejectWithValue('Ошибка получения пользователей');
    }
});
