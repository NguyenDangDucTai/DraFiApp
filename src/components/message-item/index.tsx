import {Image, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import moment from "moment-timezone";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

import {FontAwesomeButton} from "../fontawesome-button";
import {styles} from "./styles";
import {FILE, IMAGE, REPLY, TEXT} from "../../constants/MessageType.ts";
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart';

function MessageItem({msg, isSender, onLongClick, onHeartIconLongClick}: { msg: any, isSender: boolean, onLongClick?: any, onHeartIconLongClick?: any }) {
    return (
        <View
            style={{
                ...styles.messageBoxReceiver,
                flexDirection: isSender ? "row-reverse" : "row",
            }}
        >
            <Image
                source={{uri: msg?.senderPicture}}
                style={{borderRadius: 100, width: 40, height: 40}}
            />
            <View style={{
                borderRadius: 7,
                maxWidth: "70%",
                position: 'relative'
            }}>
                <TouchableOpacity onLongPress={onLongClick}>
                    {msg.type === TEXT && (
                        <TextContent content={msg.content} isSender={isSender} senderName={msg.senderName}/>
                    )}
                    {msg.type === IMAGE && (
                        <ImageContent content={msg.content} isSender={isSender} senderName={msg.senderName}/>
                    )}
                    {msg.type === FILE && (
                        <FileContent content={msg.content} isSender={isSender} senderName={msg.senderName}/>
                    )}
                    {msg.type === REPLY && (
                        <TextContentReply content={msg.content} isSender={isSender} senderName={msg.senderName}/>
                    )}
                </TouchableOpacity>

                <FontAwesomeButton
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        borderRadius: 100,
                        borderStyle: 'solid',
                        borderColor: '#dcdde1',
                        borderWidth: 1,
                        width: 30,
                        height: 30,
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    icon={{
                        icon: faHeart,
                    }}
                    onClick={() => {
                        console.log('on click')
                    }}
                    onLongClick={onHeartIconLongClick}
                />

                <Text style={{color: "#95afc0", fontSize: 12, marginTop: 7}}>
                    {moment(msg.timestamp).format('HH:mm')}
                </Text>
            </View>
        </View>
    )
}

const TextContent = ({content, isSender, senderName}: {content: any, isSender: boolean, senderName: any}) => {
    return (
        <View style={{
            paddingHorizontal: 15,
            paddingVertical: 12,
            backgroundColor: isSender ? '#c7ecee' : 'white',
            borderRadius: 7,
            position: 'relative',
            minWidth:70,
            maxWidth:200,
        }}>
            {!isSender && <Text style={{color:'black', marginBottom:5,}}>{senderName}</Text>}
            <Text style={{color: "#535c68", }}>
                {content}
            </Text>
        </View>
    )
}

function ImageContent({content, isSender, senderName}: { content: any, isSender: boolean, senderName: any }) {
    const imageList: string[] = content.split('|').filter((item: string) => item.trim() !== "");

    return (
        <View>
            {!isSender &&
                <Text style={{
                    color:'black',
                    marginBottom:5,
                    padding:5,
                    borderRadius:5,
                }}>
                    {senderName}
                </Text>
                }
            <View style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                gap: 10,
            }}>
                {imageList?.map((image: string) => (
                    <Image
                        key={image}
                        source={{uri: image}}
                        style={{width: 100, height: 100, borderRadius: 5, backgroundColor: "#dcdde1"}}
                    />
                ))}
            </View>
        </View>
    )
}


function FileContent({content, isSender, senderName}: { content: any, isSender: boolean, senderName:any}) {
    const fileList: string[] = content.split('|').filter((item: string) => item.trim() !== "");

    return (
        <View>
            {!isSender && <Text style={{color:'black', marginBottom:5,}}>{senderName}</Text>}
            {fileList?.map((file: string, index: number) => (
                <View key={file} style={{
                    flexDirection: 'row',
                    gap: 7,
                    paddingHorizontal: 15,
                    paddingVertical: 12,
                    alignItems: 'center',
                    backgroundColor: isSender ? '#c7ecee' : 'white',
                    marginBottom: index === fileList.length - 1 ? 0 : 10,
                    borderRadius: 7
                }}>
                    <FontAwesomeIcon icon={faFile} size={35} color="#8854d0"/>
                    <View>
                        <Text
                            style={{borderRadius: 5, color: "#535c68", fontSize: 15, fontWeight: 500}}
                        >
                            File Name
                        </Text>
                        <Text
                            style={{borderRadius: 5, color: "#535c68", fontSize: 12}}
                        >
                            15 KB - CSV
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    )
}

const TextContentReply = ({content, isSender, senderName}: {content: any, isSender: boolean, senderName: any}) => {

    return (
        <View style={{
            paddingHorizontal: 15,
            paddingVertical: 12,
            backgroundColor: isSender ? '#c7ecee' : 'white',
            borderRadius: 7,
            position: 'relative',
            minWidth:70,
            maxWidth:200,
        }}>
            {!isSender && <Text style={{color:'black', marginBottom:5,}}>{senderName}</Text>}
            <Text style={{color: "#535c68", }}>
                {content}
            </Text>
        </View>
    )
}

export {MessageItem}
