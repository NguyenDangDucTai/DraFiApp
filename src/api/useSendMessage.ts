import {useMutation, useQueryClient} from "@tanstack/react-query";
import {sendMessage} from "./chatApi";
import {LIST_ALL_MESSAGES} from "../constants/QueryKey";
import {chatSocket} from "../configs/SocketIOConfig.ts";

const useSendMessage = (chatId: string) => {
    const queryClient = useQueryClient();

    const { mutate: sendMessageMutate } = useMutation({
        mutationFn: (data: any) => sendMessage(data),
        onSuccess: (res) => {
            console.log(res);
            console.log('send message success');
            const message = res?.data?.data?.newMessage;

            if(message) {
                chatSocket.emit("send-msg-private", {
                    receiveId: chatId,
                    newMessage: {
                        senderId: message?.senderId,
                        senderName: message?.senderName,
                        senderPicture: message?.senderPicture,
                        type: message?.type,
                        content: message?.content,
                        timestamp: message?.timestamp
                    }
                })

                console.log('refresh all message');
                queryClient.invalidateQueries({ queryKey: [`${LIST_ALL_MESSAGES}_${chatId}`] });
            }
        },
        onError: (errors) => {
            console.error('send message error', errors);
        },
    });

    return sendMessageMutate;
}

export {useSendMessage}
