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
export const chatReaction = axios.create({
    baseURL: "https://chat.ntt1102.xyz/api/reactions",
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    }
})
export const chatUser = axios.create({
    baseURL: "https://chat.ntt1102.xyz/api/users",
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    }
})

export const notificationServiceApi = axios.create({
    baseURL: "https://notification.ntt1102.xyz/api/requests",
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    }
});
