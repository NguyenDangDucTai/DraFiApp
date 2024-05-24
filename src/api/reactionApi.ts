import {chatReaction} from "./axiosConfig.ts";

export const getAllReactionsUser = async (chatId: string) => {
    try {
        return await chatReaction.get(`chat/${chatId}`)
    } catch (error) {
        throw error;
    }
}

