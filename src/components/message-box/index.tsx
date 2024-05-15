import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles.ts";
import moment from "moment-timezone";
import {RoomChat} from "../../models/RoomChat.ts";

const MessageBox = ({ item, user, onClick }: { item: RoomChat, user: any, onClick?: any }) => {
    const latestMessage = item.getLatestMessage();

    return (
        <TouchableOpacity
            style={styles.message}
            onPress={onClick}
        >
            <Image
                source={{
                    uri: item?.picture
                }} style={{width: 50, height: 50, borderRadius: 100}}
            />

            <View style={styles.content}>
                <Text style={{fontSize: 15, fontWeight: 500}}>{item.getDisplayName(user.id)}</Text>
                <Text style={{fontSize: 15, color: "#AAAAAA", marginTop: 7}}>
                    {latestMessage?.type === 'text' ? (latestMessage?.content?.length > 28 ? `${latestMessage?.content?.slice(0, 28)}...` : latestMessage?.content)
                        : (latestMessage?.type === 'image' ? 'Bạn đã nhận được một hình ảnh' : (latestMessage?.type === 'files' ? 'Bạn đã nhận được một file' : 'Hãy cùng nhau trò chuyện nhé'))}
                </Text>
            </View>

            <Text style={{color: "#AAAAAA"}}>
                {latestMessage?.timestamp ? moment(latestMessage?.timestamp).format("HH:mm") : ""}
            </Text>
        </TouchableOpacity>
    )
}

export {MessageBox}
