import {chatServiceApi} from "./axiosConfig";

export const listAllParticipants = async (id: string) => {
    try {
        return await chatServiceApi.get(`/participants/${id}`);
    } catch (error) {
        throw error;
    }
}