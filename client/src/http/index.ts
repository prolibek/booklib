import axios from "axios";

import AuthService from "../services/authService";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

const API_URL = "http://127.0.0.1:8000/";

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    const access_token = localStorage.getItem('access_token');

    if(access_token)
        config.headers.Authorization = `Bearer ${access_token}`;
    return config;
})

$api.interceptors.request.use(
    (res) => res,
    async (error) => {
        const dispatch = useDispatch();

        if(localStorage.getItem('access_token')) {
            const req = error.config;
            if(!req._retry && error.response.status === 401 && error.response) {
                // to avoid infinite loop
                req._retry = true;
                const refresh = localStorage.getItem('refresh_token');
                try {
                    const response = await AuthService.refresh({ refresh });
                    const new_refresh = response.refresh;
                    const access = response.access;
                    dispatch(login({
                        access_token: access,
                        refresh_token: refresh
                    }))
                } catch (error) {

                }
            }
        }
    }
)

export default $api;