import {Animated, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "./styles.ts";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {FontAwesomeButton} from "../../components/fontawesome-button";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import ScrollView = Animated.ScrollView;
import {useSelector} from "react-redux";
import useListAllChats from "../../api/useListAllChat.ts";
import {useEffect, useState} from "react";
import {RoomChat} from "../../models/RoomChat.ts";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import {faP} from "@fortawesome/free-solid-svg-icons";
import {TEXT} from "../../constants/MessageType.ts";
import {useSendMessage} from "../../api/useSendMessage.ts";
import {v4 as uuidv4} from "uuid";
import * as MESSAGE_TYPE from "../../constants/MessageType.ts";

const ShareMessageScreen =({navigation, route}:any) =>{

    const user = useSelector((state: any) => state.userData);
    const userId = user.id;
    const displayName = user.display_name;
    const userAvatar = user.avatar;
    const { data: chats } = useListAllChats();
    const {msg} = route.params;

    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        if(chats) {
            setParticipants(chats.filter((item: any)=> Array.isArray(item.participants) && item.participants.includes(userId)));
        }
    }, [chats]);

    const [listUserShare, setListUserShare] = useState([]);

    const handleShare = () =>{
        // console.log(listUserShare)
        listUserShare.map(item => {
            // @ts-ignore
            const chatId = item.chatId;
            console.log(chatId)
            const sendMessage = useSendMessage(chatId);
            sendMessage({
                chatId: chatId,
                messageId: uuidv4(),
                senderId: userId,
                senderName: displayName,
                senderPicture: userAvatar,
                type: MESSAGE_TYPE.TEXT,
                content: msg.content,
                timestamp: Date.now()
            });
        })
        navigation.goBack()
    }


    return(
        <View style={styles.container}>
            <View style={styles.title}>
                <FontAwesomeButton
                    icon={{icon: faArrowLeft, color: 'black', size: 25}}
                    onClick={()=>{
                        setListUserShare([]);
                        navigation.goBack()
                    }}/>
                <View style={{marginLeft: 20}}>
                    <Text style={{
                        color: "black",
                        fontSize:16,
                        fontWeight: "bold",
                    }}>
                        Chia sẻ
                    </Text>
                    <Text style={{color:"#BBBBBB"}}>
                        Đã chọn {listUserShare.length}
                    </Text>
                </View>
            </View>
            <View style={styles.findChat}>
                <FontAwesomeButton icon={{icon: faMagnifyingGlass, color: 'black', size: 19}}/>
                <TextInput
                    style={styles.findChatInput}
                    placeholder={"Search"}
                    placeholderTextColor={"#CCCCCC"}

                />
            </View>

            <View
                style={{flex:1}}
            >
                <ScrollView
                    style={styles.listRoom}
                    keyboardDismissMode={"on-drag"}
                >
                    {participants?.map((item: RoomChat) => (
                        <UserBox
                            item={item}
                            listUserShare={listUserShare}
                            setListUserShare={setListUserShare}
                            key={item.chatId} userId={userId}
                        />
                    ))}
                </ScrollView>
            </View>

            {listUserShare.length > 0 &&
                <View
                    style={styles.viewSend}
                >
                    <ScrollView
                        horizontal={true}
                        style={styles.imageList}
                    >
                        {listUserShare?.map((item:RoomChat)=>(
                            <View
                                style={{marginRight:15}}
                            >
                                {item.type ==="public" ? (
                                    <Image
                                        source={{uri: item.picture}}
                                        style={{width:50, height:50, borderRadius:100}}
                                    />
                                ):(
                                    <Image
                                        source={{uri: item.picture?.split('|')[item.participants.indexOf(userId)]}}
                                        style={{width:50, height:50, borderRadius:100}}
                                    />
                                )}
                            </View>
                        ))}
                    </ScrollView>

                    <View
                        style={{
                            flexDirection:'row',
                            marginTop:20,
                            alignItems:'center'
                        }}
                    >
                        <View style={{flex:1, marginRight:20}}>
                            <Text style={{color:'black', fontSize:18, fontWeight:'bold', marginBottom:5}}>
                                Content
                            </Text>
                            {msg.type === TEXT && (
                                <Text style={{color:'black'}}>
                                    {msg.content.length > 100 ? msg.content.substring(0, 100) + '...' : msg.content}
                                </Text>
                            )}
                        </View>
                        <View
                            style={{backgroundColor:"#70a1ff", width:60, height:60, alignItems:'center', justifyContent:'center', borderRadius:100}}
                        >
                            <FontAwesomeButton
                                icon={{icon: faPaperPlane, color:"white", size:35}}
                                onClick={handleShare}
                            />
                        </View>
                    </View>
                </View>
            }
        </View>
    )
}

const UserBox = ({item, listUserShare, setListUserShare, userId}:{item:RoomChat, listUserShare:any, setListUserShare: any, userId: string}) =>{
    const [checkUser, setCheckUser ] = useState(false)
    const handleAddToList = () =>{
        if(!checkUser){
            setListUserShare(pre => {
                const list = [...pre];
                list.push(item);
                return list;
            })
        }
        else {
            setListUserShare(pre => {
                const list = [...pre];
                const findItemRemove = list.find(item=>item.chatId === item.chatId);
                if(findItemRemove !== -1){
                    list.splice(findItemRemove, 1);
                }
                return list;
            })
        }
    }

    const participantIndex = item.participants.indexOf(userId);

    let avatar : string | undefined;
    let displayName :string;
    if(item.type === "public"){
        avatar = item.picture;
        displayName = item.name;
    } else {
        // @ts-ignore
        avatar = item.picture.split('|')[participantIndex];
        displayName = item.name.split('/')[participantIndex];
    }



    return(
        <TouchableOpacity
            onPress={()=>{
                setCheckUser(!checkUser)
                console.log("Select", checkUser)
                handleAddToList()
            }}
            activeOpacity={0.5}
            style={{
                flexDirection:'row',
                alignItems:"center",
                marginHorizontal:15,
                marginVertical:10,
            }}
        >
            <Image source={{uri: avatar}} style={{width: 50, height:50, borderRadius:100}}/>
            <Text style={{color: 'black', fontSize:18, marginLeft:10, flex:1}}>
                {displayName}
            </Text>
            <Text style={{color: 'black', fontSize:18, marginLeft:10, flex:1}}>
                {checkUser}
            </Text>

            <View
                style={[styles.checkBox, checkUser &&{backgroundColor:"#33CCFF"}]}
            >
                {checkUser &&(
                    <FontAwesomeIcon icon={faCheck} size={15} color="white"/>
                )}
            </View>
        </TouchableOpacity>
    )
}



export default ShareMessageScreen;