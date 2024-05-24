import {
    Animated, Image,
    ImageBackground,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {styles} from "./styles.ts";
import ScrollView = Animated.ScrollView;
import {useSelector} from "react-redux";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import {useEffect, useRef, useState} from "react";

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons/faEllipsis';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons/faFaceSmile';
import { faImages } from '@fortawesome/free-regular-svg-icons/faImages';
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";

import * as MESSAGE_TYPE from "../../constants/MessageType.ts";
import {firestore} from "../../configs/FirebaseConfig.ts";
import {useListAllMessage} from "../../api/useListAllMessages.ts";
import {useSendMessage} from "../../api/useSendMessage.ts";
import {MessageItem} from "../../components/message-item";
import {FontAwesomeButton} from "../../components/fontawesome-button";
import {EmojisMessage} from "../../components/emojis-message";
import {Button} from "../../components/button";
import {EmojiKeyboard} from "rn-emoji-keyboard";
import {
    ROUTING_CALL,
    ROUTING_CALL_CONNECTION_SCREEN,
    ROUTING_INFO_SINGLE_ROOM,
    ROUTING_ROOM_CHAT, ROUTING_SHARE_MESSAGE_SCREEN
} from "../../navigation/path.ts";
import {chatSocket} from "../../configs/SocketIOConfig.ts";
import {RoomChat} from "../../models/RoomChat.ts";
import {ImagePickerResponse, launchImageLibrary} from "react-native-image-picker";
import {Buffer} from "buffer";
import {chatReaction, chatServiceApi} from "../../api/axiosConfig.ts";
import useGetAllReactionsUser from "../../api/useGetAllReactionsUser.ts";



// @ts-ignore
// @ts-ignore
const RoomChatScreen = ({ route, navigation }: any) => {


    const { chatId, senderAvatar } = route.params;
    const user = useSelector((state: any) => state.userData);
    const userId = user.id;
    const userAvatar = user.avatar;
    const displayName = user.display_name;


    const { messages } = useListAllMessage(chatId);
    const [message, setMessage] = useState('');
    const [mangerId, setMangerId] = useState();
    const [settingGroup, setSettingGroup] = useState({
        allowSendMessage: true,
    });
    const [emojiMessageModalShow, setEmojiMessageModalShow] = useState<any>();
    const [messageModalShow, setMessageModalShow] = useState<any>(null);
    const [reactionModalShow, setReactionModalShow] = useState<any>(null);
    const [messageReply, setMessageReply] = useState<any>(null);
    const [emojiPanelShow, setEmojiPanelShow] = useState(false);
    const [roomChat, setRoomChat] = useState<RoomChat>();
    const [showReply, setShowReply] = useState(false);
    const [typeSendMessage, setTypeSendMessage] = useState(MESSAGE_TYPE.TEXT)
    const [msgShowReceive, setMsgShowReceive] = useState();
    const [timeShowDelete, setTimeShowDelete] = useState();

    const reactions = useGetAllReactionsUser(chatId).data;



    const sendMessage = useSendMessage(chatId);


    const handleSendMessage = () =>{
        if(message.trim() === "") return;
        const time = Date.now()
        const messageId = uuidv4()
        sendMessage({
            chatId: chatId,
            messageId: messageId,
            senderId: userId,
            senderName: displayName,
            senderPicture: userAvatar,
            type: typeSendMessage,
            content: message,
            timestamp: time,
        });
        if(roomChat?.type === "private"){
            const receiverID = roomChat?.getReceiverId(userId);
            chatSocket.emit("send-msg-private", {
                receiveId: receiverID,
                newMessage:{
                    messageId: messageId,
                    senderId: userId,
                    senderName: displayName,
                    senderPicture: userAvatar,
                    type: typeSendMessage,
                    content: message,
                    timestamp: time,
                }
            })
        }
        if(roomChat?.type === "public"){
            const receiverID = roomChat?.getReceiverId(userId);
            chatSocket.emit("send-msg-public", chatId,{
                receiveId: roomChat.participants.filter((item) => item !== userId),
                newMessage:{
                    messageId: messageId,
                    senderId: userId,
                    senderName: displayName,
                    senderPicture: userAvatar,
                    type: typeSendMessage,
                    content: message,
                    timestamp: time,
                }
            })
        }
        setMessage("");
        setShowReply(false);
    }

    const handleBtnCallClick = (callType: string) => {
        console.log('handle btn call click');

        const incomingVoiceCall = {
            receiveId: roomChat?.getReceiverId(userId),
            senderId: user?.id,
            senderPicture: user?.avatar,
            senderName: user?.display_name,
            receiveName: roomChat?.getDisplayName(userId),
            receivePicture: roomChat?.picture,
            chatId: roomChat?.chatId,
        };

        if (callType == "VOICE") {
            chatSocket.emit("request-to-voice-call-private", incomingVoiceCall);

            navigation.navigate(ROUTING_CALL_CONNECTION_SCREEN, {
                avatar: roomChat?.picture,
                displayName: roomChat?.getDisplayName(userId),
                isSender: true,
                status: "Đang kết nối",
                onAccept: handleAcceptCall,
                onReject: handleRejectCall,
                onCancel: handleCancelCall
            })
        }

        // if (type == "public") {
        //     chatSocket.emit("request-to-voice-call-public", {
        //         currentChat: currentChat,
        //         incomingVoiceCall: incomingVoiceCall,
        //     });
        // }
    }


    const handleAcceptCall = () => {
        console.log('Accept call');
    }

    const handleRejectCall = () => {
        console.log('Reject call');
    }

    const handleCancelCall = () => {
        console.log('Cancel call');

        const incomingVoiceCall = {
            receiveId: roomChat?.getReceiverId(userId),
            senderId: user?.id,
            senderPicture: user?.avatar,
            senderName: user?.display_name,
            receiveName: roomChat?.getDisplayName(userId),
            receivePicture: roomChat?.picture,
            chatId: roomChat?.chatId,
        };

        chatSocket.emit("request-end-voice-call", {
            senderId: userId,
            receiveId:
                incomingVoiceCall.senderId == userId
                    ? incomingVoiceCall.receiveId
                    : incomingVoiceCall.senderId,
        });

        navigation.goBack();
    }

    useEffect(() => {
        firestore.collection("Chats")
            .doc(chatId)
            .get()
            .then((snapshot) => {
                const data = snapshot.data();
                if(data) {
                    setMangerId(data.managerId)
                    setSettingGroup(snapshot.data()?.setting? data.setting: {
                        allowSendMessage: true,
                    })
                    setRoomChat(new RoomChat(data));
                }
            })
    }, [chatId]);

    const typeRoom = roomChat?.type
    const handleMenu = ()=>{
        if(typeRoom === 'private'){
            navigation.navigate(ROUTING_INFO_SINGLE_ROOM, {item: roomChat, user: user });
        }
    }

    const scrollViewRef = useRef(null);
    // @ts-ignore
    // scrollViewRef.current.scrollToEnd({ animated: true });
    // useEffect(() => {
    //     // Scroll to the bottom when content size changes
    //     // @ts-ignore
    //     scrollViewRef.current.scrollToEnd({ animated: true });
    // }, [messages]);

    const  handleDeleteMessage= async () => {
        console.log(messageModalShow.msg.messageId)
        await chatServiceApi.put(`/${chatId}/messages/${messageModalShow.msg.messageId}`)
            .then(()=>{
                if(roomChat?.type === "private"){
                    const receiverID = roomChat?.getReceiverId(userId);
                    chatSocket.emit("send-msg-private", {
                        receiveId: receiverID,
                        newMessage: messageModalShow.msg,
                    })
                    console.log("success emit private")
                }
                if(roomChat?.type === "public"){
                    const receiverID = roomChat?.getReceiverId(userId);
                    chatSocket.emit("send-msg-public", chatId,{
                        receiveId: roomChat.participants.filter((item) => item !== userId),
                        newMessage: messageModalShow.msg,
                    })
                }
                console.log("Success removed")
                setMessageModalShow(null)

            }).catch((err) =>{
                console.error(err)
            })
    }

    const handleRemoveMsg = async () =>{
        console.log(messageModalShow.msg.messageId)
        await chatServiceApi.delete(`/${chatId}/messages/${messageModalShow.msg.messageId}`)
            .then(()=>{
                if(roomChat?.type === "private"){
                    const receiverID = roomChat?.getReceiverId(userId);
                    chatSocket.emit("send-msg-private", {
                        receiveId: receiverID,
                        newMessage: messageModalShow.msg,
                    })
                    console.log("success emit private")
                }
                if(roomChat?.type === "public"){
                    const receiverID = roomChat?.getReceiverId(userId);
                    chatSocket.emit("send-msg-public", chatId,{
                        receiveId: roomChat.participants.filter((item) => item !== userId),
                        newMessage: messageModalShow.msg,
                    })
                }
                console.log("Success removed")
                setMessageModalShow(null)

            }).catch((err) =>{
                console.error(err)
            })
    }


    console.log("message data: ", messages);



    const [selectedImage, setSelectedImage] = useState<ImagePickerResponse| null>(null);
    const importImage = async () => {
        await launchImageLibrary({ presentationStyle: "fullScreen" }, async (response: ImagePickerResponse) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error:', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button:', response.customButton);
            } else {
                // Set the selected image
                setSelectedImage(response.assets[0]);
                console.log(selectedImage);
                const buffer = Buffer.from(selectedImage?.uri, 'base64');
                console.log("buffer", buffer)
                // let imageContent = "";
                // const fileName = `images/${Date.now()}-${selectedImage?.fileName}`;
                // console.log("1")
                // const fileRef = storage
                // console.log("2")
                // await fileRef.put(buffer,{
                //     contentType : selectedImage?.type
                // }).then(()=>{
                //
                // }).error((err: any) =>{
                //     console.error(err);
                // })
                //
                // const url = await fileRef.getDownloadURL()
                // console.log("url ne", url)


                // await chatServiceApi.post(`/${chatId}/images`, {
                //         formData,1
                //         newMessage: {
                //             messageId: uuidv4(),
                //             senderId: userId,
                //             senderName: displayName,
                //             senderPicture: userAvatar,
                //             type: IMAGE,
                //             timestamp: Date.now(),
                //         },
                //     })
                //     .then((response) => {
                //         console.log("Yes");
                //     })
                //     .catch((err) => {
                //         console.error("error", err);
                //     });

                // console.log("123123");
            }
        });
    };



    const handleCheckTime = (timestamp: any) =>{
        const timeToday = Date.now();
        const tenMinutesInMilliseconds = 60 * 1000;
        setTimeShowDelete(timeToday - timestamp > tenMinutesInMilliseconds);
    }

    const senderName = roomChat?.getDisplayName(userId);


    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <FontAwesomeButton
                    icon={{
                        icon: faArrowLeft,
                        size: 20,
                        color: "white"
                    }}
                    onClick={() => navigation.goBack()}
                />

                <View style={styles.bodyTitle}>
                    <Text style={{fontSize: 16, fontWeight: "bold", color: 'white'}}>
                        {roomChat?.getDisplayName(userId)}
                    </Text>
                    <Text style={{fontSize: 12, color: '#DDDDDD'}}>
                        Đang hoạt động
                    </Text>
                </View>

                <FontAwesomeButton
                    icon={{
                        icon: faPhone,
                        size: 20,
                        color: "white"
                    }}
                    onClick={() => handleBtnCallClick('VOICE')}
                />
                <FontAwesomeButton
                    icon={{
                        icon: faVideo,
                        size: 20,
                        color: "white"
                    }}
                    onClick={() => handleBtnCallClick('VIDEO')}
                />
                <FontAwesomeButton
                    icon={{
                        icon: faBars,
                        size: 20,
                        color: "white"
                    }}
                    onClick={()=>handleMenu()}
                />
            </View>

            <ScrollView
                style={styles.bodyChat}
                ref={scrollViewRef}
                // onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                onLayout={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                {roomChat?.type.includes("private") &&(
                    <View style={{alignItems:'center', marginTop:20}}>
                        <View
                            style={{borderRadius:15, overflow: 'hidden'}}
                        >
                            <ImageBackground
                                source={require("../../assets/newFriend.png")}
                                style={{width:300, height:150, borderRadius:10, alignItems:'center'}}
                            >
                                <View
                                    style={{flexDirection: 'row', marginTop:15}}
                                >
                                    <Image source={{uri: userAvatar}} style={{width:50, height:50, borderRadius:100, left:2.5}}/>
                                    <Image source={{uri: senderAvatar}} style={{width:50, height:50, borderRadius:100, zIndex:5, right:2.5}}/>
                                </View>
                                <Text
                                    style={{color: 'black', fontWeight:'bold',fontSize:15, marginTop:10}}
                                >
                                    Bạn và {senderName} đã trở thành bạn bè
                                </Text>
                                <Text
                                    style={{color: '#AAAAAA', fontSize:13, marginTop:5}}
                                >
                                    Hãy gửi lời chào đến {senderName} nào
                                </Text>
                            </ImageBackground>
                        </View>
                    </View>
                )}
                {roomChat?.type === "public" &&(
                    <View>

                    </View>
                )}
                {messages?.map((item: any) => {
                    // const [reaction, setReaction] = useState<[any]>(reactions?.filter((reac:any)=> reac.messageId === item.messageId));
                    // if(reaction.i ){
                    //     setReaction(null)
                    // }
                    const reaction = reactions?.filter((reac:any)=> reac.messageId === item.messageId)
                    return(
                        <MessageItem
                            key={item.messageId}
                            msg={item}
                            messages={messages}
                            reaction={reaction}
                            isSender={item.senderId === userId}
                            onHeartIconLongClick={() => setEmojiMessageModalShow({
                                msg: item,
                                isSender: item.senderId === userId,
                            })}
                            onLongClick={() => {
                                setMessageModalShow({
                                    msg: item,
                                    isSender: item.senderId === userId,
                                })
                                setMsgShowReceive(item)
                                setMsgShowReceive(item)
                                const reactionMsgModalShow = reactions?.filter((reac:any)=> reac.messageId === item.messageId);
                                const findReaction = reactionMsgModalShow.find((item:any) => item.senderId === userId);
                                setReactionModalShow(findReaction);
                                console.log("reaction modal show", reactionMsgModalShow)
                                handleCheckTime(item.timestamp)
                            }}
                        />
                    )
                })}
            </ScrollView>

            {showReply  && (
                <View
                    style={styles.replyMsg}
                >
                    <View
                        style={{backgroundColor:'#00a8ff', borderRadius:10, paddingHorizontal:2, marginRight:10}}
                    />
                    <View
                        style={{flex:1, marginRight:5}}
                    >
                        <Text style={{fontSize: 13, color: 'black', fontWeight:'bold', marginBottom:10}}>
                            Name
                        </Text>
                        <Text style={{fontSize:13, color: '#AAAAAA'}}>
                            {messageReply.msg.content}
                        </Text>
                    </View>
                    <FontAwesomeButton
                        icon={{icon: faXmark, size:30, color:"#AAAAAA"}}
                        onClick={()=>{
                            setTypeSendMessage(MESSAGE_TYPE.TEXT)
                            setShowReply(false)
                        }}
                    />
                </View>
            )}
            <View style={styles.textInputChat}>
                {(settingGroup.allowSendMessage || mangerId === userId) ? (
                    <>
                        <FontAwesomeButton
                            icon={{
                                icon: faFaceSmile,
                                size: 20,
                                color: "gray"
                            }}
                            onClick={() => setEmojiPanelShow(pre => !pre)}
                        />
                        <TextInput
                            style={{
                                flex: 1,
                                fontSize: 15,
                                padding: 0,
                                color:'black'
                            }}
                            value={message}
                            numberOfLines={2}
                            multiline={true}
                            placeholder={"Nhập tin nhắn"}
                            placeholderTextColor={"#BBBBBB"}
                            onChangeText={setMessage}
                            // onFocus={() => {
                            //     setopenEmoji(false);
                            //     setOpenImage(false);
                            // }}
                        />
                        <FontAwesomeButton
                            icon={{
                                icon: faEllipsis,
                                size: 20,
                                color: "gray"
                            }}
                            // onClick={handleSendMessage}
                        />
                        <FontAwesomeButton
                            icon={{
                                icon: faImages,
                                size: 20,
                                color: "gray"
                            }}
                            onClick={importImage}
                        />
                        <FontAwesomeButton
                            icon={{
                                icon: faPaperPlane,
                                size: 20,
                                color: "#70a1ff"
                            }}
                            onClick={handleSendMessage}
                        />
                    </>
                ) : (
                    <Text style={{color: '#DDDDDD', textAlign: 'center'}}>Chỉ nhóm trưởng mới được nhắn</Text>
                )}
            </View>

            {emojiPanelShow && (
                <ScrollView style={{
                    minHeight: 250,
                    maxHeight: 250,
                    backgroundColor: 'white',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        gap: 15,
                    }}>
                        <EmojiKeyboard onEmojiSelected={() => {}}/>
                    </View>
                </ScrollView>
            )}

            <Modal
                animationType="fade"
                transparent={true}
                visible={!!emojiMessageModalShow}
                onRequestClose={() => {
                    console.log('on close')
                    // setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                    }}
                    activeOpacity={1}
                    onPressOut={() => setEmojiMessageModalShow(null)}
                >
                    <TouchableWithoutFeedback>
                        <View>
                            {emojiMessageModalShow && (<MessageItem msg={emojiMessageModalShow.msg} isSender={emojiMessageModalShow.isSender} messages={messages}/>)}
                            <EmojisMessage onClick={(emojiCode: string) => console.log('emojiCode', emojiCode)}/>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={!!messageModalShow}
                onRequestClose={() => {
                    console.log('on close')
                    // setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                    }}
                    activeOpacity={1}
                    onPressOut={() => setMessageModalShow(null)}
                >
                    <TouchableWithoutFeedback>
                        <View>
                            {messageModalShow && (<MessageItem msg={messageModalShow.msg} isSender={messageModalShow.isSender} messages={messages} reaction={reactions?.filter((reac:any)=> reac.messageId === messageModalShow.msg.messageId)}/>)}
                            <EmojisMessage
                                reactionSelect={reactionModalShow}
                                onClick={(emojiCode: string) => {
                                    console.log('emojiCode', emojiCode)
                                    if(!reactionModalShow) {
                                        const dataSend = {
                                            chatId: chatId,
                                            messageId: messageModalShow.msg.messageId,
                                            reactionId: uuidv4(),
                                            senderId: userId,
                                            timestamp: Date.now(),
                                            type:emojiCode,
                                        }
                                        chatReaction.post(``, dataSend).then(()=>{
                                            console.log("success add reaction")
                                        }).catch((error) =>{
                                            console.error("Error add reaction", error)
                                        })
                                        chatSocket.emit("request-add-reaction-private", dataSend)
                                    } else {

                                        if(reactionModalShow.type === emojiCode ) {
                                            chatReaction.delete(`/${reactionModalShow.reactionId}`).then(()=>{
                                                console.log("success delete reaction")
                                            }).catch((error) =>{
                                                console.error("Error delete reaction", error)
                                            })
                                            chatSocket.emit("request-remove-reaction-private", reactionModalShow.reactionId)
                                        } else {
                                            const dataSend = {
                                                chatId: reactionModalShow.chatId,
                                                messageId: reactionModalShow.messageId,
                                                reactionId: reactionModalShow.reactionId,
                                                senderId: reactionModalShow.senderId,
                                                timestamp: Date.now(),
                                                type:emojiCode,
                                            }
                                            chatReaction.put(``, dataSend).then(()=>{
                                                console.log("success update reaction")
                                            }).catch((error) =>{
                                                console.error("Error update reaction", error)
                                            })
                                            chatSocket.emit("request-update-reaction-private", dataSend)
                                        }
                                    }

                                    setMessageModalShow(null)
                                }}
                            />
                            <View style={{
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                borderRadius: 12,
                                backgroundColor: 'white',
                                marginTop: 12,
                                marginHorizontal: 20,
                            }}>
                                <Button
                                    style={{ paddingVertical: 10, paddingHorizontal: 20 }}
                                    text={"Trả lời"}
                                    textStyle={{fontSize: 12, fontWeight: 500, color: 'gray', marginTop: 5}}
                                    icon={require('../../assets/icon-reply.png')}
                                    iconPosition={"left"}
                                    iconStyle={{width: 30, height: 30, margin: 'auto'}}
                                    onClick={()=>{
                                        setMessageReply(messageModalShow)
                                        setMessageReply(messageModalShow)
                                        setMessageReply(messageModalShow)
                                        setTypeSendMessage(MESSAGE_TYPE.REPLY)
                                        setTypeSendMessage(MESSAGE_TYPE.REPLY)
                                        console.log(messageModalShow)
                                        setMessageModalShow(null)
                                        console.log("Msg reply", messageReply)
                                        setShowReply(true)
                                    }}
                                />
                                <Button
                                    style={{ paddingVertical: 10, paddingHorizontal: 20 }}
                                    text={"Chuyển tiếp"}
                                    textStyle={{fontSize: 12, fontWeight: 500, color: 'gray', marginTop: 5}}
                                    icon={require('../../assets/icon-share.png')}
                                    iconPosition={"left"}
                                    iconStyle={{width: 30, height: 30, margin: 'auto'}}
                                    onClick={()=>{
                                        setMessageModalShow(null)
                                        navigation.navigate(ROUTING_SHARE_MESSAGE_SCREEN, {msg: messageModalShow.msg})
                                    }}
                                />
                                <Button
                                    style={{ paddingVertical: 10, paddingHorizontal: 20 }}
                                    text={"Sao chép"}
                                    textStyle={{fontSize: 12, fontWeight: 500, color: 'gray', marginTop: 5}}
                                    icon={require('../../assets/icon-copy.png')}
                                    iconPosition={"left"}
                                    iconStyle={{width: 30, height: 30, margin: 'auto'}}
                                />
                                {userId === msgShowReceive?.senderId && !timeShowDelete && (
                                    <Button
                                        style={{ paddingVertical: 10, paddingHorizontal: 20 }}
                                        text={"Thu hồi"}
                                        textStyle={{fontSize: 12, fontWeight: 500, color: 'gray', marginTop: 5}}
                                        icon={require('../../assets/icon-recall.png')}
                                        iconPosition={"left"}
                                        iconStyle={{width: 30, height: 30, margin: 'auto'}}
                                        onClick={handleRemoveMsg}
                                    />
                                )}
                                <Button
                                    style={{ paddingVertical: 10, paddingHorizontal: 20 }}
                                    text={"Ghim"}
                                    textStyle={{fontSize: 12, fontWeight: 500, color: 'gray', marginTop: 5}}
                                    icon={require('../../assets/icon-pin.png')}
                                    iconPosition={"left"}
                                    iconStyle={{width: 30, height: 30, margin: 'auto'}}

                                />
                                <Button
                                    style={{ paddingVertical: 10, paddingHorizontal: 20 }}
                                    text={"Chi tiết"}
                                    textStyle={{fontSize: 12, fontWeight: 500, color: 'gray', marginTop: 5}}
                                    icon={require('../../assets/icon-info.png')}
                                    iconPosition={"left"}
                                    iconStyle={{width: 30, height: 30, margin: 'auto'}}
                                />
                                {userId === msgShowReceive?.senderId  && (
                                    <Button
                                        style={{ paddingVertical: 10, paddingHorizontal: 20 }}
                                        text={"Xóa"}
                                        textStyle={{fontSize: 12, textAlign: 'center', fontWeight: 500, color: 'gray', marginTop: 5}}
                                        icon={require('../../assets/icon-trash.png')}
                                        iconPosition={"left"}
                                        iconStyle={{width: 30, height: 30, margin: 'auto'}}
                                        onClick={handleDeleteMessage}
                                    />
                                )}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

export {RoomChatScreen};
