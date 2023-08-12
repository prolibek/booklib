import axios from "axios";

import AuthService from "../services/authService";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { Dispatch } from "@reduxjs/toolkit";

const API_URL = "http://127.0.0.1:8000/";

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

const $reserve = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

const refreshExpired = async (dispatch: Dispatch) => {
    const refresh = localStorage.getItem('refresh_token');
    try {
        const res = await $api.post("users/refresh-token/", { refresh });
        const response = res.data;
        const new_refresh = response.refresh;
        const access = response.access;
        dispatch(login({
            access_token: access,
            refresh_token: new_refresh
        }))
        return access;
    } catch (error) {
        console.log(error)
    }
}

$api.interceptors.request.use((config) => {

    const dispatch = useDispatch();
    let access_token = localStorage.getItem('access_token');

    if(access_token) {
        const decodedToken: JwtPayload = jwt_decode(access_token);
        if(decodedToken.exp <= (Date.now() / 1000)) {
            access_token = refreshExpired(dispatch);
            console.log('Done.');
        }
        config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
})

export default $api;