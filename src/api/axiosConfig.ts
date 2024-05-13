import axios from "axios";

export const authServiceApi= axios.create({
    baseURL: "https://auth.ntt1102.xyz/auth/api/v1",
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    }
});

export const chatServiceApi = axios.create({
    baseURL: "https://chat.ntt1102.xyz/api/chats",
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    }
});

export const notificationServiceApi = axios.create({
    baseURL: "https://notification.ntt1102.xyz/api/requests",
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    }
});
