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

$api.interceptors.request.use((config) => {

    let access_token = localStorage.getItem('access_token');

    if(access_token) 
        config.headers.Authorization = `Bearer ${access_token}`;
    return config;
})

$api.interceptors.response.use(
    (res) => res,
    async (error) => {
        try {
            const req = error.config;
            if(!req._retry && error.response.status === 401 && error.response) {
                // to avoid infinite loop
                req._retry = true;
                const refresh = localStorage.getItem('refresh_token');
                try {
                    const res = await $api.post("users/refresh-token/", { refresh });
                    const response = res.data;
                    const new_refresh = response.refresh;
                    const access = response.access;
                    localStorage.setItem("refresh_token", new_refresh);
                    localStorage.setItem("access_token", access);
                } catch (error) {
                    console.log(error);
                }
            }
            return $api(req);
        } catch (error) {
            Promise.reject(error);
        }
    }
)

export default $api;