import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles.ts";
import moment from "moment-timezone";
import {useState} from "react";

const MessageBox = ({ item, onClick }: any) => {

    console.log("avatar ne", item.image)


    return (
        <TouchableOpacity
            style={styles.message}
            onPress={onClick}
        >
            <View style={styles.img}>
                <Image source={{uri: item.image}} style={{width:50, height:50, borderRadius:100}}/>
            </View>
            <View style={styles.body}>
                <View style={styles.content}>
                    <Text style={{fontSize:15, color:"black"}}>{item.displayName}</Text>
                    <Text style={{fontSize:15, color:"#AAAAAA", marginTop:10}}>
                        {item?.content?.type === 'text' ? (item?.content?.content?.length > 28 ? `${item?.content?.content?.slice(0, 28)}...` : item?.content?.content)
                            : (item?.content?.type === 'image' ? 'Bạn đã nhận được một hình ảnh' : (item?.content?.type === 'files' ? 'Bạn đã nhận được một file' : 'Bạn đã nhận được một tin nhắn mới'))}
                    </Text>
                </View>
                <View style={styles.time}>
                    <Text style={{color:"#AAAAAA",}}>
                        {item?.content?.timestamp ? moment(item?.content?.timestamp).format("HH:mm") : ""}
                    </Text>
                    {/*tin nhan chua doc*/}
                    {/*<Text*/}
                    {/*    style={styles.messageUR}*/}
                    {/*>*/}
                    {/*    12*/}
                    {/*</Text>*/}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export {MessageBox}
