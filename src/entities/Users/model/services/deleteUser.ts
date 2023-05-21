import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteUser = createAsyncThunk<
    string,
    string,
    ThunkConfig<string>
>('users/delete', async (id, thunkApi) => {
    const { rejectWithValue, extra } = thunkApi;

    try {
        await extra.api.delete(
            `/users/${id}`,
        );

        return id
    } catch (e) {
        console.log(e);
        return rejectWithValue('Ошибка удаления пользователя');
    }
});
