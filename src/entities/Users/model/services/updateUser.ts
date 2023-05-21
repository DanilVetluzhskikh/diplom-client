import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Users } from "../types/users";

export const updateUser = createAsyncThunk<
    Users[0],
    {
        user: Users[0],
    },
    ThunkConfig<string>
>('users/update', async (data, thunkApi) => {
    const { rejectWithValue, extra } = thunkApi;

    try {
        await extra.api.put(
            `/users/${data.user.id}`,
            {
                ...data.user
            }
        );

        return data.user
    } catch (e) {
        console.log(e);
        return rejectWithValue('Ошибка удаления пользователя');
    }
});
