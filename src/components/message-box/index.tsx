import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles.ts";
import moment from "moment-timezone";

const MessageBox = ({ item, onClick }: any) => {
    return (
        <TouchableOpacity
            style={styles.message}
            onPress={onClick}
        >
            <Image
                source={{
                    uri: item.image
                }} style={{width: 50, height: 50, borderRadius: 100}}
            />

            <View style={styles.content}>
                <Text style={{fontSize: 15, fontWeight: 500}}>{item.displayName}</Text>
                <Text style={{fontSize: 15, color: "#AAAAAA", marginTop: 7}}>
                    {item?.content?.type === 'text' ? (item?.content?.content?.length > 28 ? `${item?.content?.content?.slice(0, 28)}...` : item?.content?.content)
                        : (item?.content?.type === 'image' ? 'Bạn đã nhận được một hình ảnh' : (item?.content?.type === 'files' ? 'Bạn đã nhận được một file' : 'Hãy cùng nhau trò chuyện nhé'))}
                </Text>
            </View>

            <Text style={{color: "#AAAAAA"}}>
                {item?.content?.timestamp ? moment(item?.content?.timestamp).format("HH:mm") : ""}
            </Text>
        </TouchableOpacity>
    )
}

export {MessageBox}
