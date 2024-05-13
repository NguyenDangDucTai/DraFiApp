import {authServiceApi} from "./axiosConfig.ts";

export const getUserInfo = async (uid: string) => {
    try {
        return await authServiceApi.get(`/users/${uid}`);
    } catch (error) {
        throw error;
    }
};

export const getUserByEmail = async (email: string) => {
    try {
        return await authServiceApi.get(`/users/${email}`);
    } catch (error){
        throw error;
    }
}
