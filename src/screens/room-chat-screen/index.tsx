import {Animated, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {styles} from "./styles.ts";
import ScrollView = Animated.ScrollView;
import {useSelector} from "react-redux";
import 'react-native-get-random-values';
import {useEffect, useRef, useState} from "react";
import {Asset, ImagePickerResponse, launchImageLibrary} from "react-native-image-picker";

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
import {cloudStorage, firestore} from "../../configs/FirebaseConfig.ts";
import {useListAllMessage} from "../../api/useListAllMessages.ts";
import {useSendMessage} from "../../api/useSendMessage.ts";
import {MessageItem} from "../../components/message-item";
import {FontAwesomeButton} from "../../components/fontawesome-button";
import {EmojisMessage} from "../../components/emojis-message";
import {Button} from "../../components/button";
import {EmojiKeyboard} from "rn-emoji-keyboard";
import {
    ROUTING_CALL_CONNECTION_SCREEN,
    ROUTING_INFO_SINGLE_ROOM,
    ROUTING_SHARE_MESSAGE_SCREEN
} from "../../navigation/path.ts";
import {chatSocket} from "../../configs/SocketIOConfig.ts";
import {RoomChat} from "../../models/RoomChat.ts";
import {IMAGE, SHARE} from "../../constants/MessageType.ts";
import {LIST_ALL_MESSAGES} from "../../constants/QueryKey.ts";
import {useQueryClient} from "@tanstack/react-query";



const RoomChatScreen = ({ route, navigation }: any) => {
    const queryClient = useQueryClient();
    const { chatId } = route.params;
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
    const [messageReply, setMessageReply] = useState<any>(null);
    const [emojiPanelShow, setEmojiPanelShow] = useState(false);
    const [roomChat, setRoomChat] = useState<RoomChat>();
    const [showReply, setShowReply] = useState(false);
    const [typeSendMessage, setTypeSendMessage] = useState(MESSAGE_TYPE.TEXT)

    const sendMessage = useSendMessage({
        roomType: roomChat?.type,
        chatId: chatId,
        sender: { id: userId, name: displayName, picture: userAvatar},
        receiver: roomChat?.getReceiverId(userId)
    });

    const handleSendMessage = () =>{
        if(message.trim() === "") return;

        sendMessage({
            type: typeSendMessage,
            content: message,
            replyTo: messageReply?.msg?.messageId
        });

        setMessage("");
        setShowReply(false);
        setMessageReply(null);
        setTypeSendMessage(MESSAGE_TYPE.TEXT);
    }

    const handleSendImageMessage = async (images: any[]) => {
        console.log('handle send image message', images);

        let messageContent = '';
        for(const image of images) {
            const imageUrl = await uploadImage(image);
            messageContent += imageUrl + '|';
        }

        sendMessage({
            type: IMAGE,
            content: messageContent,
        });
    }

    const uploadImage = async (image: { fileName: string, uri: string }) => {
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const imageRef = cloudStorage.ref(`images/${Date.now()}-${image.fileName}`);
        const uploadImageResponse = await imageRef.put(blob);
        const imageUrl = await imageRef.getDownloadURL();
        console.log('IMAGE URL', imageUrl);
        return imageUrl;
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

        firestore.collection("Chats")
            .doc(chatId)
            .onSnapshot((snapshot: any) => {
                console.log('EVENT NEW MESSAGE')
                const docId = snapshot.id;
                const docData = snapshot.data();
                const chatId = docData.chatId;

                queryClient.invalidateQueries({ queryKey: [`${LIST_ALL_MESSAGES}_${chatId}`] });
            })
    }, [chatId]);

    const typeRoom = roomChat?.type
    const handleMenu = ()=>{
        if(typeRoom === 'private'){
            navigation.navigate(ROUTING_INFO_SINGLE_ROOM, {item: roomChat, user: user });
        }
    }

    const scrollViewRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when content size changes
        // @ts-ignore
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, [messages]);


    const [selectedImage, setSelectedImage] = useState<ImagePickerResponse| null>(null);
    const importImage = async () => {
        await launchImageLibrary({ presentationStyle: "fullScreen" }, async (response: ImagePickerResponse) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error:', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button:', response.customButton);
            } else {
                // Set the selected image
                setSelectedImage(response);
                console.log(response);

                const formData = new FormData();// Tạo đối tượng File từ URI của hình ảnh
                formData.append("image", selectedImage);

                console.log("logne", formData);

                const images = response?.assets?.map((asset: Asset) => ({
                    uri: asset.uri,
                    fileName: asset.fileName,
                })) || [];
                handleSendImageMessage(images);

                // await chatServiceApi.post(`/${chatId}/images`, {
                //         formData,
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
            >
                {messages?.map((item: any) => (
                    <MessageItem
                        key={item.messageId}
                        msg={item}
                        messages={messages}
                        isSender={item.senderId === userId}
                        onHeartIconLongClick={() => setEmojiMessageModalShow({
                            msg: item,
                            isSender: item.senderId === userId,
                        })}
                        onLongClick={() => setMessageModalShow({
                            msg: item,
                            isSender: item.senderId === userId,
                        })}
                    />
                ))}
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
                            {messageModalShow && (<MessageItem msg={messageModalShow.msg} isSender={messageModalShow.isSender} messages={messages}/>)}
                            <EmojisMessage onClick={(emojiCode: string) => console.log('emojiCode', emojiCode)}/>
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
                                <Button
                                    style={{ paddingVertical: 10, paddingHorizontal: 20 }}
                                    text={"Thu hồi"}
                                    textStyle={{fontSize: 12, fontWeight: 500, color: 'gray', marginTop: 5}}
                                    icon={require('../../assets/icon-recall.png')}
                                    iconPosition={"left"}
                                    iconStyle={{width: 30, height: 30, margin: 'auto'}}
                                />
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
                                <Button
                                    style={{ paddingVertical: 10, paddingHorizontal: 20 }}
                                    text={"Xóa"}
                                    textStyle={{fontSize: 12, textAlign: 'center', fontWeight: 500, color: 'gray', marginTop: 5}}
                                    icon={require('../../assets/icon-trash.png')}
                                    iconPosition={"left"}
                                    iconStyle={{width: 30, height: 30, margin: 'auto'}}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

export {RoomChatScreen};
