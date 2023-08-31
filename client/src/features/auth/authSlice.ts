import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode, { JwtPayload } from "jwt-decode";

interface IAuthState {
    isAuthenticated: boolean;
    isAdmin: boolean;
    isEmailConfirmed: boolean;
}

const token = localStorage.getItem('refresh_token');
const initialState: IAuthState = {
    isAuthenticated: !!token,
    isAdmin: false,
    isEmailConfirmed: false,
};

const validateToken = (token: string | null): boolean => {
    if (!token) return false;

    try {
        const decodedToken: JwtPayload = jwt_decode(token);
        const currentTime = Date.now() / 1000;

        return decodedToken.exp > currentTime;
    } catch (error) {
        return false;
    }
};

if (token) {
    const decoded: JwtPayload = jwt_decode(token);
    initialState.isAdmin = decoded.is_admin;
    initialState.isEmailConfirmed = decoded.is_email_confirmed;

    if (!validateToken(token)) {
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_token');
        initialState.isAuthenticated = false;
    }
}

const authSlice = createSlice({
    name: 'auth', 
    initialState, 
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            const refresh = action.payload['refresh_token'];
            const decodedToken: JwtPayload = jwt_decode(refresh);
            state.isAdmin = decodedToken.is_admin;
            state.isEmailConfirmed = decodedToken.is_email_confirmed;
            localStorage.setItem('access_token', action.payload['access_token']);
            localStorage.setItem('refresh_token', refresh);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.isAdmin = false;
            state.isEmailConfirmed = false;
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        },
    },
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;