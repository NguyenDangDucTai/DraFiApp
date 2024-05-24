import {useSelector} from "react-redux";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles.ts";
import {notificationServiceApi} from "../../api/axiosConfig.ts";
import {chatSocket, notificationSocket} from "../../configs/SocketIOConfig.ts";
import useListAllAddFriendRequestSender from "../../api/useListAllAddFriendRequestSender.ts";
import {useEffect, useState} from "react";


export const SentFriendRequest = ({navigation}:any) =>{

    const user = useSelector((state: any) => state.userData);
    const userId = user.id;

    const { addFriendRequestSenderList } = useListAllAddFriendRequestSender(userId);
    const [listSender, setListSender] = useState<any>();
    useEffect(() => {
        setListSender(addFriendRequestSenderList)
    }, [addFriendRequestSenderList]);



    return(
        <View style={styles.container}>
            {listSender && listSender.map((item:any)=> {
                if(item.senderId !== userId) {
                    return (
                        <ReceivedBox key={item.requestId} navigation={navigation} item={item} userId={userId}/>
                    )
                }
            })}
        </View>
    )
}


function ReceivedBox({item, navigation, userId}:any) {

    const handleToPersonalPage = () =>{
        const idUser = item.u.id;
        navigation.navigate("PersonalPage", {idUser});
    }

    const handleCancel = async ()=>{
        console.log("item.id", item)
        console.log(userId)
        await notificationServiceApi.post(`/cancel`, {
            userId: userId,
            requestId : item.receiver,
        })
            .then(()=>{
                console.log("success cancel")
            }).catch((err)=>{
                console.error("Error cancel friend request ", err)
            })
        notificationSocket.emit("cancelFriendRequest", item)
    }


    return(
        <View>
            <TouchableOpacity
                style={styles.box}
                // onPress={handleToPersonalPage}
            >
                <View>
                    <Image source={{uri: item.profilePicture}} style={styles.image}/>
                </View>
                <View style={{flexDirection:"row", flex: 1}}>
                    <View style={{marginLeft:15, justifyContent:"space-around", flex:1}}>
                        <Text style={{fontSize:18, fontWeight:'bold', color:'black'}}>{item.receiverName}</Text>
                        <View style={{marginTop:20, alignItems:'flex-end'}}>
                            <TouchableOpacity
                                style={styles.btnRefuse}
                                onPress={handleCancel}
                            >
                                <Text style={{fontSize:18}}>Thu hồi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <View>

            </View>
        </View>
    )
}