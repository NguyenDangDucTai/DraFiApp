import {useMutation, useQueryClient} from "@tanstack/react-query";
import {sendMessage} from "./chatApi";
import {LIST_ALL_MESSAGES} from "../constants/QueryKey";
import {chatSocket} from "../configs/SocketIOConfig.ts";
import {PRIVATE, PUBLIC} from "../constants/RoomType.ts";
import { v4 as uuidv4 } from 'uuid';

const useSendMessage = ({roomType, chatId, sender, receiver}: {roomType: string | undefined | null, chatId: string, sender: any, receiver: string | string[] | undefined | null}) => {
    const queryClient = useQueryClient();

    const { mutate: sendMessageMutate } = useMutation({
        mutationFn: async (message: any) => sendMessage({
            ...message,
            chatId: chatId,
            messageId: message.replyTo || uuidv4(),
            senderId: sender.id,
            senderName: sender.name,
            senderPicture: sender.picture,
            timestamp: Date.now(),
        }),
        onSuccess: (res) => {
            const message = res?.data?.data?.newMessage;
            console.log('send message success', message);

            if(message) {
                console.log('refresh all message');
                queryClient.invalidateQueries({ queryKey: [`${LIST_ALL_MESSAGES}_${chatId}`] });

                if(roomType === PRIVATE) {
                    chatSocket.emit("send-msg-private", {
                        receiveId: receiver,
                        newMessage:{
                            messageId: message?.messageId,
                            senderId: message?.senderId,
                            senderName: message?.senderName,
                            senderPicture: message?.senderPicture,
                            type: message?.type,
                            content: message?.content,
                            timestamp: message?.timestamp,
                        }
                    })
                }
                if(roomType === PUBLIC) {
                    chatSocket.emit("send-msg-public", chatId,{
                        receiveId: receiver,
                        newMessage:{
                            messageId: message?.messageId,
                            senderId: message?.senderId,
                            senderName: message?.senderName,
                            senderPicture: message?.senderPicture,
                            type: message?.type,
                            content: message?.content,
                            timestamp: message?.timestamp,
                        }
                    })
                }
            }
        },
        onError: (errors) => {
            console.error('send message error', errors);
        },
    });

    return sendMessageMutate;
}

export {useSendMessage}
