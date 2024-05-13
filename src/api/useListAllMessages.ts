import {useQuery} from "@tanstack/react-query";
import {LIST_ALL_MESSAGES} from "../constants/QueryKey";
import {listAllMessages} from "./chatApi";

const useListAllMessage = (chatId: string) => {
    const { data: messages, isLoading, error} = useQuery({
        queryKey: [`${LIST_ALL_MESSAGES}_${chatId}`],
        queryFn: () => listAllMessages(chatId),
    });

    if(error) {
        console.error('Error listing all messages', error);
    }

    return { messages: messages?.data, isLoading }
}

export { useListAllMessage };
