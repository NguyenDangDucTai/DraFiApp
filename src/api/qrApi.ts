import {authServiceApi} from "./axiosConfig.ts";

export const scanQr = async (uid: string, token: string) => {
    try {
        return await authServiceApi.post('/qr/scan', {
            uid, token
        });
    } catch (error) {
        throw error;
    }
}

export const confirmQr = async (token: string) => {
    try {
        return await authServiceApi.post('/qr/confirm', {
            token
        });
    } catch (error) {
        throw error;
    }
}

export const rejectQr = async (token: string) => {
    try {
        return await authServiceApi.post('/qr/reject', {
            token
        });
    } catch (error) {
        throw error;
    }
}
