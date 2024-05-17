import {chatServiceApi} from "./axiosConfig.ts";


export const createGroupChat = async (
    { groupName, participantIdList, type, picture, managerId }: { groupName: string, participantIdList: any, type: string, picture: string, managerId: string }) => {
    try {
        return await chatServiceApi.post("", {
            name: groupName,
            participants: participantIdList,
            type: type,
            picture: picture,
            managerId: managerId,
        })
    } catch(error) {
        throw error;
    }
}