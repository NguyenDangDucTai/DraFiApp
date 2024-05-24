import {useQuery} from "@tanstack/react-query";
import {GET_REACTIONS_USER} from "../constants/QueryKey.ts";
import {getAllReactionsUser} from "./reactionApi.ts";


const useGetAllReactionsUser = (chatId: string) => {
    const {data: response, isLoading, error} = useQuery({
        queryKey: [GET_REACTIONS_USER],
        queryFn: () => getAllReactionsUser(chatId)
    });
    if(error) {
        console.error('Error getting reaction  info', error);
    }

    return { data: response?.data.data, isLoading }
}

export default useGetAllReactionsUser;