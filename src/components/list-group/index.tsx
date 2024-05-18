import {useSelector} from "react-redux";
import useListAllChats from "../../api/useListAllChat.ts";
import {useEffect, useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles.ts";
import {faUserGroup} from "@fortawesome/free-solid-svg-icons/faUserGroup"
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {MessageBox} from "../message-box";
import {ROUTING_ROOM_CHAT} from "../../navigation/path.ts";
import {RoomChat} from "../../models/RoomChat.ts";


export const GroupsComponent = ({navigation}: any)=>{

    const user = useSelector((state: any) => state.userData);
    const userId = user.id;
    const { data: listChats } = useListAllChats();

    const [listGroups, setListGroups] = useState([]);


    console.log('LIST ALL GROUPS', listChats);

    useEffect(() => {
        if(listChats) {
            setListGroups(listChats.filter((item: any)=> Array.isArray(item.participants) && item.participants.includes(userId) && item.type === 'public'));
        }
    }, [listChats]);

    return(
        <View>
            <TouchableOpacity
                style={styles.createGroup}
                onPress={()=>{navigation.navigate("CreateNewGroup")}}
            >
                <FontAwesomeIcon icon={faUserGroup} size={24} color="black" />
                <Text style={{ fontSize:18, marginLeft:10, color:'black'}}>
                    Create new group
                </Text>
            </TouchableOpacity>

            <View>
                {listGroups && listGroups.map((item: RoomChat) => {
                    let chatName = item.name;
                    let latestMessage = item?.messages && item?.messages?.length > 0 ? item.messages[item.messages.length - 1] : null;

                    console.log(item)
                    return(
                        <MessageBox
                            item={new RoomChat(item)}
                            user={user}
                            key={item.chatId}
                            onClick={() => navigation.navigate(ROUTING_ROOM_CHAT, { chatId: item.chatId })}
                        />
                    )
                })}

            </View>
        </View>
    )
}