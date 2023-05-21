import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Users, UsersSchema } from '../types/users';
import { getUsers } from '../services/getUsers';
import { StateSchema } from '@/app/providers/StoreProvider';
import { deleteUser } from '../services/deleteUser';
import { updateUser } from '../services/updateUser';

const initialState: UsersSchema = {
    users: [],
    isLoading: false,
    error: ''
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getUsers.fulfilled,
            (state, { payload }: PayloadAction<Users>) => {
                state.users = payload
                state.isLoading = false;
            },
        );
        builder.addCase(getUsers.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        });
        builder.addCase(deleteUser.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        });
        builder.addCase(deleteUser.fulfilled, (state, {payload}: PayloadAction<string>) => {
            state.isLoading = false
            state.users = state.users.filter((user) => user.id !== payload)
        });
        builder.addCase(updateUser.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        });
        builder.addCase(updateUser.fulfilled, (state, {payload}: PayloadAction<Users[0]>) => {
            state.isLoading = false
            state.users = state.users.map((user) => {
                if(user.id === payload.id) {
                    return payload
                } else {
                    return user
                }
            })
        });
    },
});

export const getUsersState = (state: StateSchema) => state.users.users
export const getUsersError = (state: StateSchema) => state.users.error
export const getUsersIsLoading = (state: StateSchema) => state.users.isLoading

// Action creators are generated for each case reducer function
export const { actions: usersActions } = usersSlice;
export const { reducer: usersReducer } = usersSlice;
