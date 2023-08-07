import $api from "../http";

interface LoginData {
    login_id: string;
    password: string;
}

interface RegisterData {
    email: string;
    username: string;
    password: string;
}

interface RefreshData {
    refresh: string;
}

interface AuthResponse {
    access_token: string;
    refresh_token: string;
    detail?: string;
}

interface RefreshResponse {
    access: string;
    refresh: string;
}

const AuthService = {
    login: async (data: LoginData) : Promise <AuthResponse> => {
        try {    
            const response = await $api.post("users/login/", data);
            return response.data;        
        } catch (error) {
            throw new Error("Ошибка входа.");
        }
    },

    register: async (data: RegisterData) : Promise <AuthResponse> => {
        try {
            const response = await $api.post("users/register/", data);
            return response.data;
        } catch (error) {
            throw new Error("Ошибка регистрации.")
        }
    },

    logout: async (data: RefreshData) : Promise <void> => {
        try {
            const response = await $api.post("users/logout/", data);
            return response.data;
        } catch (error) {
            throw new Error("Ошибка выхода.");
        }
    },

    refresh: async (data: RefreshData) : Promise <RefreshResponse> => {
        try {
            const response = await $api.post("users/refresh/", data);
            return response.data;
        } catch (error) {
            throw new Error("Ошибка обновления сессии.");
        }
    }
};

export default AuthService;