import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
    token: null | string;
    isAuthenticated: boolean;
}

const initialState: IAuthState = {
    token: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'auth', 
    initialState, 
    reducers: {
        login: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('access_token', action.payload);
        },
        logout: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = false;
            localStorage.removeItem('access_token');
        },
    },
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;