import {chatServiceApi, notificationServiceApi} from "./axiosConfig.ts";

export const listAllChats = async () => {
    try {
        return await chatServiceApi.get('');
    } catch (error) {
        throw error;
    }
}

export const listAllMessages = async (chatId: string) => {
    try {
        return await chatServiceApi.get(`/${chatId}/messages`);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const sendMessage = async (
    { messageId, chatId, senderId, senderName, senderPicture, type, content, timestamp }:
    { messageId: string, chatId: string, senderId: string, senderName: string, senderPicture: string, type: string, content: any, timestamp: any }
) => {
    try {
        return await chatServiceApi.put(`/${chatId}/messages`, {
            newMessage: {
                messageId,
                senderId, senderName, senderPicture, type, content, timestamp
            }
        })
    } catch (error) {
        throw error;
    }
}


export const listAllAddFriendRequestReceived = async (userId: string) => {
    try {
        return await notificationServiceApi.get(`/getListReceiverRequest/${userId}`);
    } catch (error) {
        throw error;
    }
}

export const deleteMessage = async ({ chatId, messageId }: { chatId: string, messageId: string }) => {
    try {
        return await chatServiceApi.delete(`/${chatId}/messages/${messageId}`);
    } catch (error) {
        throw error;
    }
}
