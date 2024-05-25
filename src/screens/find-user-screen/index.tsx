import {useEffect, useState} from "react";
import {Animated, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "./styles.ts";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {faArrowAltCircleRight} from "@fortawesome/free-solid-svg-icons/faArrowAltCircleRight";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {firestore} from "../../configs/FirebaseConfig.ts";
import {useSelector} from "react-redux";
import ScrollView = Animated.ScrollView;
import {chatServiceApi, notificationServiceApi} from "../../api/axiosConfig.ts";
import { v4 as uuidv4 } from 'uuid';
import {notificationSocket} from "../../configs/SocketIOConfig.ts";



export const FindUserScreen = ({navigation}:any) => {
    const user = useSelector((state: any) => state.userData);
    const userId = user.id;
    const [inputSearch, setInputSearch] = useState("");
    const [userList, setUserList] = useState<any>([]);
    const [friendRequestList, setFriendRequestList] = useState<any>([]);
    const [filterSearch, setFilterSearch] = useState<any>([]);



    useEffect(() => {
        firestore.collection("Users")
            .onSnapshot((snapshot:any)=>{
                const listReaction: any[] = [];
                snapshot.forEach((doc:any) => {
                    const reactionData = doc.data();
                    listReaction.push(reactionData);
                });
                setUserList(listReaction);
            })

        firestore.collection("FriendRequests")
            .onSnapshot((snapshot:any)=>{
                const listReaction: any[] = [];
                snapshot.forEach((doc:any) => {
                    const reactionData = doc.data();
                    listReaction.push(reactionData);
                });
                setFriendRequestList(listReaction);
            })
    }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // const { data } = await usersInfo.get(`/users`);
    //             // setUserList(data.data);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };
    //     fetchData();
    // }, []);

    const handleFindUser = () =>{
        if(userList){
            setFilterSearch(userList.filter((item: any)=>(item.phone === inputSearch && item.phone !== user.phone )));
            console.log("Filter Search",filterSearch);
        }

    }


    return(
        <View style={styles.container}>
            <View style={styles.title}>
                <TouchableOpacity
                    style={{marginRight:15, justifyContent:'center'}}
                    onPress={()=>{navigation.goBack()}}
                >
                    <FontAwesomeIcon icon={faArrowLeft}  size={30} color="white" />
                </TouchableOpacity>
                <View style={{justifyContent:'center'}}>
                    <Text style={{fontWeight:'bold', fontSize:20, color:'white'}}>
                        Add friend
                    </Text>
                </View>
            </View>

            <View style={styles.qgView}>
                <View style={styles.backgroundQG}>
                    <Text style={{color:'white', fontWeight:'bold', fontSize:18}}>User name</Text>
                    <Image
                        source={require('../../assets/qgZalo.png')}
                        style={{width:150, height:150, marginVertical:10, borderRadius:5}}
                    />
                    <Text style={{color:'white'}}>Scan the code to add friends to Zalo with me</Text>
                </View>
            </View>

            <View style={styles.findView}>
                <View style={{flex:1, justifyContent:'center'}}>
                    <TextInput
                        onChangeText={setInputSearch}
                        value={inputSearch}
                        style={styles.inputFindUser}
                        placeholder={"Enter username or number phone"}
                        placeholderTextColor={"#CCCCCC"}
                    />
                </View>
                <TouchableOpacity
                    style={styles.btnFind}
                    onPress={handleFindUser}
                >
                    <FontAwesomeIcon icon={faArrowAltCircleRight}  size={30} color="#AAAAAA" />
                </TouchableOpacity>
            </View>
            <ScrollView style={{flex:1}}>
                {filterSearch && filterSearch.map((item:any)=>{
                    const request = friendRequestList.find((res: any)=>(res.receiver === userId && res.sender === item.id)||(res.receiver === item.id && res.sender === userId));


                    return(
                        <BoxUser navigation={navigation} key={item.id} item={item} userId={userId} friendRequest={request} user={user}/>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const BoxUser = ({item, navigation, userId, friendRequest, user}:any) =>{
    const checkFriend = (item.friends.find((item:any)=> item.id === userId))
    console.log(user)
    const dataPost = {
        isAccepted: false,
        receiver: item.id,
        sender: userId,
        profilePicture: user.avatar,
        senderName: user.display_name,
        receiverName: item.display_name,
        requestId: null,
    }
    console.log("Member", dataPost)
    const handleAddFriend = async () =>{
        await notificationServiceApi
            .post(`/add`, dataPost)
            .then(()=>{
                console.log("Success add friend")
            })
            .catch((err)=>{
                console.error(err)
            })
        //
        // await firestore.collection("FriendRequests")
        //     .doc(dataPost.requestId)
        //     .set(dataPost)
        //     .then(()=>{
        //         console.log("Success add friend")
        //     })
        //     .catch((err)=>{
        //         console.error(err)
        //     })
        notificationSocket.emit("sendFriendRequest", dataPost)
    }
    return(
        <TouchableOpacity
            style={styles.boxUser}
        >
            <Image source={{uri:item.profilePicture}} style={{width:50, height:50, borderRadius:100}}/>
            <Text style={{fontSize:16, marginLeft:15, fontWeight:'bold', flex:1, color:"black"}}>
                {item.display_name}
            </Text>
            {checkFriend ? (
                <View>
                    <FontAwesomeIcon icon={faCheckCircle} size={30} color={"#00a8ff"}/>
                </View>
            ):friendRequest?(
                <View
                    style={{
                        backgroundColor:"red",
                        padding:5,
                        borderRadius:5,
                    }}
                >
                    <Text style={{fontWeight:'bold', color:"white"}}>
                        Request
                    </Text>
                </View>
            ):(
                <TouchableOpacity
                    style={{
                        backgroundColor:"#0bba0b",
                        padding:5,
                        borderRadius:5,
                    }}
                    onPress={handleAddFriend}
                >
                    <Text style={{fontWeight:'bold', color:"white"}}>
                        ADD FRIEND
                    </Text>
                </TouchableOpacity>
            )}

        </TouchableOpacity>
    )
}