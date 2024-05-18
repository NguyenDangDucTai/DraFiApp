import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles.ts";
import moment from "moment-timezone";
import {RoomChat} from "../../models/RoomChat.ts";
import {useSelector} from "react-redux";
import {useState} from "react";

const MessageBox = ({ item, user, onClick }: { item: RoomChat, user: any, onClick?: any }) => {

    // const user = useSelector((state: any) => state.userData);
    const userId = user.id;

    const latestMessage = item.getLatestMessage();
    const participantIndex = item.participants.indexOf(userId);

    let avatar : string | undefined;
    if(item.type === "public"){
        avatar = item.picture;
    } else {
        avatar = item.picture.split('|')[participantIndex];
    }


    return (
        <TouchableOpacity
            style={styles.message}
            onPress={onClick}
        >
            <View style={styles.img}>
                <Image source={{
                    uri: avatar
                }} style={{width:50, height:50, borderRadius:100}}/>
            </View>

            <View style={styles.body}>
                <View style={styles.content}>
                    <Text style={{fontSize: 15, fontWeight: 500, color:'black'}}>{item.getDisplayName(user.id)}</Text>
                    <Text style={{fontSize: 15, color: "#AAAAAA", marginTop: 7}}>
                        {latestMessage?.type === 'text' ? (latestMessage?.content?.length > 28 ? `${latestMessage?.content?.slice(0, 28)}...` : latestMessage?.content)
                            : (latestMessage?.type === 'image' ? 'Bạn đã nhận được một hình ảnh' : (latestMessage?.type === 'files' ? 'Bạn đã nhận được một file' : 'Hãy cùng nhau trò chuyện nhé'))}
                    </Text>
                </View>
            </View>

            <View style={styles.time}>
                <Text style={{color: "#AAAAAA"}}>
                    {latestMessage?.timestamp ? moment(latestMessage?.timestamp).format("HH:mm") : ""}
                </Text>
                {/*<Text*/}
                {/*    style={styles.messageUR}*/}
                {/*>*/}
                {/*    12*/}
                {/*</Text>*/}
            </View>


        </TouchableOpacity>

    )
}


export {MessageBox}
