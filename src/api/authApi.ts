import {authServiceApi} from "./axiosConfig.ts";

export const login = async (data: { username: string, password: string }) => {
    try {
        return await authServiceApi.post('/signin', data);
    } catch (error) {
        throw error;
    }
}
