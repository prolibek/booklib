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

interface LogoutData {
    refresh: string;
}

interface AuthResponse {
    access_token: string;
    refresh_token: string;
    detail?: string;
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

    logout: async (data: LogoutData) : Promise <void> => {
        try {
            const response = await $api.post("users/logout/", data);
            return response.data;
        } catch (error) {
            throw new Error("Ошибка выхода.");
        }
    }
};

export default AuthService;