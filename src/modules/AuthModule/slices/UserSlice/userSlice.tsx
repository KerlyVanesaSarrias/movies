import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER } from '../../../MoviesModule/constants';
import {
    clearUserAuthenticatedLS,
    getUserAuthenticatedLS,
    setUserAuthenticatedLS,
} from '../../helpers/localStorageData';

export interface User {
    email: string;
    name: string;
}

interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: getUserAuthenticatedLS(),
    isAuthenticated: getUserAuthenticatedLS() ? true : false,
    isLoading: false,
    error: null,
};

interface LoginResponse {
    success: boolean;
    user: User | null;
}

interface LoginPayload {
    email: string;
    password: string;
}

export const fetchLogin = createAsyncThunk<LoginResponse, LoginPayload>(
    'user/fetchLogin',
    async ({ email, password }) => {
        return new Promise((resolve) => {
            const timer = setTimeout(() => {
                if (email === USER.email && password === USER.password) {
                    setUserAuthenticatedLS({
                        name: USER.name,
                        email: USER.email,
                    });
                    resolve({
                        success: true,
                        user: { name: USER.name, email: USER.email },
                    });
                } else {
                    resolve({ success: false, user: null });
                }
                clearTimeout(timer);
            }, 800);
        });
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            clearUserAuthenticatedLS();
            state.error = null;
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.isAuthenticated = false;
            })
            .addCase(
                fetchLogin.fulfilled,
                (state, action: PayloadAction<LoginResponse>) => {
                    state.isLoading = false;
                    state.user = action.payload.user;
                    state.isAuthenticated = action.payload.success;
                    state.error = action.payload.success
                        ? null
                        : 'Invalid email or password';
                }
            );
    },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
