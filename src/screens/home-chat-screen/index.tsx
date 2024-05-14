import {View, TouchableOpacity, TextInput, Animated} from "react-native";
import {styles} from "./styles.ts";
import ScrollView = Animated.ScrollView;
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import useListAllChats from "../../api/useListAllChat.ts";
import {MessageBox} from "../../components/message-box";
import {ROUTING_ROOM_CHAT} from "../../navigation/path.ts";

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faQrcode } from '@fortawesome/free-solid-svg-icons/faQrcode';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import {FontAwesomeButton} from "../../components/fontawesome-button";

const HomeChatScreen = ({navigation}: any) => {
    const user = useSelector((state: any) => state.userData);
    const userId = user.id;

    const { data: chats } = useListAllChats();

    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        if(chats) {
            setParticipants(chats.filter((item: any)=> Array.isArray(item.participants) && item.participants.includes(userId)));
        }
    }, [chats]);

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
                    {participants && participants.map((item: any) => {
                        console.log('ITEMMMMM', item);

                        let chatName: string;
                        const type = item.type;
                        if(type === 'public') {
                            chatName = item.name;
                        } else {
                            const indexParticipant = item.participants.indexOf(userId);
                            chatName = item.name.split('/')[indexParticipant];
                        }
                        let latestMessage = item?.messages && item?.messages?.length > 0 ? item.messages[item.messages.length - 1] : null;

                        return (
                            <MessageBox
                                item={{
                                    id: item.chatId,
                                    displayName: chatName,
                                    image: item.picture,
                                    content: latestMessage,
                                    type: item.type,
                                }}
                                navigation={navigation}
                                key={item.chatId}
                                onClick={() => {
                                    navigation.navigate(ROUTING_ROOM_CHAT, {
                                        chatId: item.chatId,
                                        roomName: chatName,
                                        type: item.type,
                                    })
                                }}
                            />
                        )
                    })}
                </ScrollView>
            </View>
        </View>
    )
}

export { HomeChatScreen }
