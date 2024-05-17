import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createGroupChat} from "./chatGroupApi";
import {LIST_ALL_CHATS, LIST_ALL_PARTICIPANTS} from "../constants/QueryKey.ts";

const useCreateGroupChat = () => {
    const queryClient = useQueryClient();
    const { mutate: createGroupChatMutate } = useMutation({
        mutationFn: createGroupChat,
        onSuccess: (res) => {
            console.log('CREATE GROUP CHAT RES', res);
            queryClient.invalidateQueries({ queryKey: [LIST_ALL_CHATS] });
            queryClient.invalidateQueries({ queryKey: [LIST_ALL_PARTICIPANTS] });
        },
        onError: (error) => {
            console.error('CREATE GROUP CHAT ERROR', error);
        }
    });

    return createGroupChatMutate;
}

export default useCreateGroupChat;