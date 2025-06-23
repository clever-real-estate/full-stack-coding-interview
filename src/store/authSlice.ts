import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiLogin } from '../utils/utils';

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }: { username: string; password: string }) => {
        return await apiLogin(username, password);
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'),
        loading: false,
        error: null as string | null,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload;
                state.loading = false;
                localStorage.setItem('token', action.payload);
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
                state.error = 'Login failed';
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
