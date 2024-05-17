import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles.ts";
import {useSelector} from "react-redux";
import {useListParticipants} from "../../api/useListParticipants.ts";
import {FontAwesomeButton} from "../fontawesome-button";
import {faPhone} from "@fortawesome/free-solid-svg-icons/faPhone";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons/faUserPlus";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {ROUTING_FRIEND_REQUEST} from "../../navigation/path.ts";


export const FriendsComponent = ({navigation}: any) =>{

    const user = useSelector((state: any) => state.userData);
    const userId = user.id;
    const { participants } = useListParticipants(userId);

    const handleFriendRequest = () =>{
        navigation.navigate(ROUTING_FRIEND_REQUEST);
    }

    return(
        <View>
            <TouchableOpacity
                style={styles.friendRequest}
                onPress={handleFriendRequest}

            >
                <FontAwesomeIcon icon={faUserPlus} style={{color:'black' }} size={20}/>
                <Text style={{ fontSize:18, marginLeft:10, color:'black'}}>
                    Friend request
                </Text>
            </TouchableOpacity>
            {/*<View style={styles.listFriends}>*/}
            {/*    <Text style={{fontWeight:'bold',fontSize:18, marginLeft:10, marginTop:10}}>*/}
            {/*        My firends*/}
            {/*    </Text>*/}
            {/*</View>*/}
            <View style={{}}>
                {participants && participants.map((item: any) => {
                    console.log("piturec a", item.picture)
                    const chatId = item.chatId;
                    const participantIndex = item.participants.indexOf(userId);
                    const friendId = item.participants[participantIndex];
                    const friendName = item.name.split('/')[participantIndex];
                    const picture = item.picture.split('|')[participantIndex];
                    const type = item.type;

                    const friendItem = {
                        id: chatId,
                        image: picture,
                        displayName: friendName,
                        userName: friendName,
                    }

                    return (
                        type !== 'public' && <BoxFriend item={friendItem} key={friendItem.id} navigation={navigation}/>
                    )
                })}
            </View>
        </View>
    )
}

function BoxFriend({item, navigation}: any){
    const handleBoxFriend = () =>{
        navigation.navigate("RoomChat", {
            chatId: item.id,
            roomName: item.displayName,
            type: item.type,
        })
    }
    const handleCallVideo = ()=>{
        console.log("Hi")
    }
    const handleCallPhone = () =>{

    }
    return(
        <TouchableOpacity
            style={styles.boxFriend}
            onPress={handleBoxFriend}
        >
            <View style={{flexDirection:'row',alignItems:'center', flex:1}}>
                <Image source={{uri:item.image}} style={{width:40, height:40, borderRadius:100}}/>
                <Text style={{fontSize:18, marginLeft:15, color:'black', fontWeight:'bold'}}>
                    {item.displayName}
                </Text>
            </View>
            <TouchableOpacity
                style={{marginRight:10}}
                onPress={handleCallPhone}
            >
                {/*<Ionicons name="call-outline" size={20} color="black" />*/}
                <FontAwesomeButton icon={{icon: faPhone, color: 'black', size: 19}}/>
            </TouchableOpacity>
            <TouchableOpacity
                style={{marginLeft:10}}
                onPress={handleCallVideo}
            >
                {/*<Ionicons name="videocam-outline" size={25} color="black" />*/}
            </TouchableOpacity>

        </TouchableOpacity>
    )
}