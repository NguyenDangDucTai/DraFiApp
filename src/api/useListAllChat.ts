import {useQuery} from "@tanstack/react-query";
import {LIST_ALL_CHATS} from "../constants/QueryKey.ts";
import {listAllChats} from "./chatApi.ts";

const useListAllChats = () => {
    const { data, error } = useQuery({
        queryKey: [LIST_ALL_CHATS],
        queryFn: listAllChats,
    });

    if(error) {
        console.error('Error listing all chats', error);
    }

    return {
        data: data ? data.data : null,
    }
}

export default useListAllChats;
