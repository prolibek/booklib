import axios from "axios";

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

export default $api;