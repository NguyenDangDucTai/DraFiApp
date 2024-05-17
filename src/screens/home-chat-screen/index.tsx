import {View, TextInput, Animated} from "react-native";
import {styles} from "./styles.ts";
import ScrollView = Animated.ScrollView;
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import useListAllChats from "../../api/useListAllChat.ts";
import {MessageBox} from "../../components/message-box";
import {ROUTING_CALL, ROUTING_CALL_CONNECTION_SCREEN, ROUTING_ROOM_CHAT} from "../../navigation/path.ts";

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faQrcode } from '@fortawesome/free-solid-svg-icons/faQrcode';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import {FontAwesomeButton} from "../../components/fontawesome-button";
import {RoomChat} from "../../models/RoomChat.ts";
import {firestore} from "../../configs/FirebaseConfig.ts";
import {LIST_ALL_CHATS, LIST_ALL_MESSAGES} from "../../constants/QueryKey.ts";
import {chatSocket} from "../../configs/SocketIOConfig.ts";
import {useQueryClient} from "@tanstack/react-query";
import {RoomType} from "../../models/RoomType.ts";

const HomeChatScreen = ({navigation}: any) => {
    const queryClient = useQueryClient();
    const user = useSelector((state: any) => state.userData);
    const userId = user.id;

    const { data: chats } = useListAllChats();

    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        if(chats) {
            setParticipants(chats.filter((item: any)=> Array.isArray(item.participants) && item.participants.includes(userId)));
        }
    }, [chats]);

    useEffect(() => {
        if(userId && chats) {
            const myChats = chats.filter((chat: any) => chat.participants.includes(userId));

            myChats.forEach((chat: any) => {
                firestore.collection("Chats")
                    .doc(chat.chatId)
                    .onSnapshot((snapshot: any) => {
                        const docId = snapshot.id;
                        const docData = snapshot.data();
                        const chatId = docData.chatId;

                        queryClient.invalidateQueries({ queryKey: [LIST_ALL_CHATS] });
                        queryClient.invalidateQueries({ queryKey: [`${LIST_ALL_MESSAGES}_${chatId}`] });
                    })
            })
        }

        chatSocket.emit("add-user", userId);

        // Sự kiện khi có cuộc gọi đến
        chatSocket.on("response-to-voice-call-private", (data) => {
            console.log('RESPONSE TO VOICE CALL PRIVATE', data);

            const incomingVoiceCall = {
                receiveId: data?.receiveId,
                senderId: data?.senderId,
                senderPicture: data?.avatar,
                senderName: data?.display_name,
                receiveName: data?.receiveName,
                receivePicture: data?.receivePicture,
                chatId: data?.chatId,
            };

            navigation.navigate(ROUTING_CALL_CONNECTION_SCREEN, {
                avatar: data?.senderPicture,
                displayName: data?.senderName,
                isSender: false,
                status: "Đang có cuộc gọi đến",
                onAccept: () => {
                    chatSocket.emit("request-accept-voice-call", incomingVoiceCall, true);
                },
                onReject: () => {
                    console.log('btn cancel clicked')
                    chatSocket.emit("request-cancel-voice-call", incomingVoiceCall);
                    navigation.goBack();
                },
            })
        });

        // Sự kiện khi người nhận cuộc gọi chấp nhận
        chatSocket.on("response-accept-call-private", (data) => {
            console.log('response-accept-call-private', data);

            const incomingVoiceCall = {
                receiveId: data?.receiveId,
                senderId: data?.senderId,
                senderPicture: data?.avatar,
                senderName: data?.display_name,
                receiveName: data?.receiveName,
                receivePicture: data?.receivePicture,
                chatId: data?.chatId,
            };

            navigation.navigate(ROUTING_CALL, {
                chatId: incomingVoiceCall.chatId,
                userId: userId,
                userName: user.display_name,
                avatar: user.avatar,
                roomName: incomingVoiceCall.receiveName,
                roomType: RoomType.SINGLE,
                type: 'VIDEO',
            })
        });

        // Sự kiện khi người nhận cuộc gọi từ chối
        chatSocket.on("response-cancel-call-private", (data) => {
            console.log('response-cancel-call-private', data);
            if(chats.map(({chatId}: {chatId: string}) => chatId).includes(data.chatId)) {
                navigation.goBack();
            }
        });

        // Sự kiện khi người gọi hủy cuộc gọi
        chatSocket.on("response-end-call-private", (data) => {
            console.log('response-end-call-private', data);
            if(chats.map(({chatId}: {chatId: string}) => chatId).includes(data.chatId)) {
                navigation.goBack();
            }
        });

        // if (socket) {

        //     notificationSocket.emit("add-user", userId);
        //
        //     socket.on("msg-recieve-private", (data) => {
        //         console.log('SOCKET PRIVATE MESSAGE RECEIVED', data)
        //
        //         const chatId = data.from;
        //         queryClient.invalidateQueries({ queryKey: [QueryKey.LIST_ALL_PARTICIPANTS] });
        //         queryClient.invalidateQueries({ queryKey: [`${QueryKey.LIST_ALL_MESSAGES}_${chatId}`] });
        //     });
        //
        //     socket.on("msg-recieve-public", (data) => {
        //         console.log('SOCKET PUBLIC MESSAGE RECEIVED', data);
        //
        //         const chatId = data.from;
        //         queryClient.invalidateQueries({ queryKey: [QueryKey.LIST_ALL_PARTICIPANTS] });
        //         queryClient.invalidateQueries({ queryKey: [`${QueryKey.LIST_ALL_MESSAGES}_${chatId}`] });
        //     });
        //
        //     notificationSocket.on("friendRequest", (data) => {
        //         console.log('FRIEND REQUEST', data);
        //         queryClient.invalidateQueries({ queryKey: [QueryKey.LIST_ALL_ADD_FRIEND_REQUEST_RECEIVED] });
        //     });
        //
        //     notificationSocket.on("acceptFriend", (data) => {
        //         console.log('ACCEPT FRIEND', data);
        //     });
        // }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.findChat}>
                <FontAwesomeButton icon={{icon: faMagnifyingGlass, color: 'white', size: 19}}/>
                <TextInput
                    style={styles.findChatInput}
                    placeholder={"Search"}
                    placeholderTextColor={"#EEEEEE"}
                />
                <FontAwesomeButton icon={{icon: faQrcode, color: 'white', size: 19}}/>
                <FontAwesomeButton icon={{icon: faPlus, color: 'white', size: 19}}/>
            </View>

            <View style={styles.body}>
                <ScrollView>
                    {participants?.map((item: RoomChat) => (
                        <MessageBox
                            key={item.chatId}
                            item={new RoomChat(item)}
                            user={user}
                            onClick={() => navigation.navigate(ROUTING_ROOM_CHAT, { chatId: item.chatId })}
                        />
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

export { HomeChatScreen }
