import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginRequestType, RegisterRequestType, AuthStateType } from "../../types/authType";
import { axiosErrorHandler } from "../../utils/errors";
import { getUserCurrent, setUserCurrent } from "../../utils/commons";
import { setToken, clearToken } from "../../utils/token";
import AuthService from "../../services/authService";

export const login = createAsyncThunk("auth/login", async (payload: LoginRequestType, { rejectWithValue }) => {
        try {
            const response = await AuthService.login(payload);
            setToken(response.data.token);
            setUserCurrent(response.data.user);
            return response.data.user;
        } catch (err) {
            const error = axiosErrorHandler(err)
            return rejectWithValue(error);
        }
    }
);

export const register = createAsyncThunk("auth/register", async (payload: RegisterRequestType, { rejectWithValue }) => {
    try {
        const response = await AuthService.register(payload);
        setToken(response.data.token);
        return response.data.user;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        const response = AuthService.logout();
        clearToken();
        return response;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

const initialState: AuthStateType = {
    user: getUserCurrent() || null,
    errors: null,
    isLoading: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        });
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        });
        builder.addCase(logout.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.user = null;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        });
    },
});

export default authSlice.reducer;
