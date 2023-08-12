import { createSlice } from "@reduxjs/toolkit";

import jwt_decode, { JwtPayload } from "jwt-decode";

interface IAuthState {
    token: null | object;
    isAuthenticated: boolean;
}

const token = localStorage.getItem('refresh_token');

const validateToken = (token: string | null): boolean => {
    if(!token) return false;

    try {
        const decodedToken: JwtPayload = jwt_decode(token);
        const currentTime = Date.now() / 1000;

        return decodedToken.exp > currentTime;
    } catch (error) {
        return false;
    }
}

if(!validateToken(token)) {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token');
}

const initialState: IAuthState = {
    token: token
        ? {
            access_token: localStorage.getItem("access_token"),
            refresh_token: token
        }
        : null
        ,
    isAuthenticated: !!token,
}

if(token) {
    initialState.token = {
        access_token: localStorage.getItem('access_token'),
        refresh_token: localStorage.getItem('refresh_token')
    };
    initialState.isAuthenticated = true;
}

const authSlice = createSlice({
    name: 'auth', 
    initialState, 
    reducers: {
        login: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('access_token', action.payload['access_token']);
            localStorage.setItem('refresh_token', action.payload['refresh_token']);
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        },
    },
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;