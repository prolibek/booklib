import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
    token: null | string;
    isAuthenticated: boolean;
}


const initialState: IAuthState = {
    token: null,
    isAuthenticated: false,
}

const token = localStorage.getItem('access_token');

if (token) {
    initialState.token = token;
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