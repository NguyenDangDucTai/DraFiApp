import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles.ts";
import {useSelector} from "react-redux";
import useListAllAddFriendRequestReceived from "../../api/useListAllAddFriendRequestReceived.ts";
import {chatServiceApi, chatUser, notificationServiceApi} from "../../api/axiosConfig.ts";
import {notificationSocket} from "../../configs/SocketIOConfig.ts";
import {useEffect, useState} from "react";
import {firestore} from "../../configs/FirebaseConfig.ts";


export const ReceivedFriendRequest = ({navigation}:any) =>{

    const user = useSelector((state: any) => state.userData);
    const userId = user.id;

    const { addFriendRequestReceivedList } = useListAllAddFriendRequestReceived(userId);
    const [listReceived, setListReceived] = useState<any>();

    useEffect(() => {
        firestore.collection("FriendRequests")
            .where("receiver", "==", userId)
            .onSnapshot((snapshot:any) =>{
                const listRequest: any[] =[]
                snapshot.forEach((doc:any)=>{
                    const requestData = doc.data();
                    listRequest.push(requestData)
                });
                setListReceived(listRequest);
            })
    }, []);
    console.log("Receiver: ", listReceived)


    return(
        <View style={styles.container}>
            {listReceived && listReceived.map((item:any)=> {
                const requestId = item.requestId;
                return (
                    <ReceivedBox key={item.requestId} navigation={navigation} item={item} userId={userId}/>
                )
            })}
        </View>
    )
}

function ReceivedBox({item, navigation, userId}:any) {

    const handleToPersonalPage = () =>{
        const idUser = item.u.id;
        navigation.navigate("PersonalPage", {idUser});
    }
    const handleRefuse = async () =>{
        await notificationServiceApi.post(`/decline`, {
            userId: userId,
            requestId : item.sender,
        })
            .then(()=>{
                console.log("success reject")
            }).catch((err)=>{
                console.error("Error cancel friend request ", err)
            })
        notificationSocket.emit("rejectFriendRequest", item)
    }
    const handleAccept = async ()=>{
        const postData = {
            senderId: item.sender,
            senderName: item.senderName,
            profilePicture: item.profilePicture,
            receiver: userId,
        };
        await chatServiceApi.put(`/${userId}`, postData)
            .then(()=>{
                console.log("Success accept")
            }).catch((err)=>{
                console.error("Accept friend Error: ", err)
            })
        await notificationServiceApi.post(`/delete`, item)
            .then(()=>{
                console.log("Delete success")
            }).catch((err)=>{
                console.error("Delete Error: ", err)
            })
        notificationSocket.emit('acceptFriendRequest', item)
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
                        <Text style={{fontSize:18, fontWeight:'bold', color:'black'}}>{item.senderName}</Text>
                        <View style={{flexDirection:'row', marginTop:20}}>
                            <TouchableOpacity
                                style={styles.btnAccept}
                                onPress={handleAccept}
                            >
                                <Text>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnRefuse}
                                onPress={handleRefuse}
                            >
                                <Text>Refuse</Text>
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