import {Image, ImageBackground, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import moment from "moment-timezone";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

import {FontAwesomeButton} from "../fontawesome-button";
import {styles} from "./styles";
import {FILE, IMAGE, REPLY, SHARE, TEXT, INIT, INITGROUP} from "../../constants/MessageType.ts";
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart';
import {IconType} from "../../constants/IconType.ts";
import { faShareFromSquare } from '@fortawesome/free-regular-svg-icons/faShareFromSquare';
import {cloudStorage} from "../../configs/FirebaseConfig.ts";
import {useEffect, useState} from "react";

function MessageItem({msg, isSender, onLongClick, onHeartIconLongClick, messages, reaction}: { msg: any, isSender: boolean, onLongClick?: any, onHeartIconLongClick?: any, messages:any, reaction:any}) {

    const foundMessageReply = messages.find((item) => item.messageId === msg.messageId);
    const indexReaction = reaction?.length;
    let visibleIcon : any;
    if(indexReaction > 0){
        visibleIcon = IconType[reaction[indexReaction -1].type];
    } else{
        visibleIcon = null;
    }


    return (
        <View>
            {msg.type.includes(INITGROUP) && (
                <View style={{marginVertical:15, alignItems:'center'}}>
                    <Text style={{color: 'black', backgroundColor:'white', paddingVertical:5, paddingHorizontal:10, borderRadius:10}}>
                        {msg.content}
                    </Text>
                </View>
            )}
            {!msg.type.includes(INIT) &&(
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

                        {msg.status === "removed" ?(
                            <View>
                                <TextContent content={"Message has been recovered"} isSender={isSender} senderName={msg.senderName}/>
                            </View>
                        ):(
                            <TouchableOpacity onLongPress={onLongClick}>
                                {msg.type === TEXT && (
                                    <TextContent content={msg.content} isSender={isSender} senderName={msg.senderName} timestamp={msg.timestamp}/>
                                )}
                                {msg.type === IMAGE && (
                                    <ImageContent content={msg.content} isSender={isSender} senderName={msg.senderName}/>
                                )}
                                {msg.type === FILE && (
                                    <FileContent content={msg.content} isSender={isSender} senderName={msg.senderName}/>
                                )}
                                {msg.type === REPLY && (
                                    <TextContentReply content={msg.content} isSender={isSender} senderName={msg.senderName} foundMessageReply={foundMessageReply}/>
                                )}
                                {msg.type.includes(SHARE) &&(
                                    <ShareContent content={msg.content} isSender={isSender} senderName={msg.senderName} msg={msg}/>
                                )}
                            </TouchableOpacity>
                        )}
                        <View>
                            {reaction?.length !== 0 &&(
                                <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        right:0,
                                        bottom: msg.type === TEXT ? -12:0,
                                        borderRadius: 100,
                                        borderStyle: 'solid',
                                        borderColor: '#dcdde1',
                                        borderWidth: 1,
                                        width: 30,
                                        height: 30,
                                        backgroundColor: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    onPress={() => {
                                        console.log('on click')
                                    }}
                                    onLongPress={onHeartIconLongClick}

                                >
                                    <Image source={{uri: visibleIcon}} style={{width:20, height:20}}/>
                                </TouchableOpacity>
                            )}


                            {msg.type !== TEXT &&(
                                <Text style={{color: "#95afc0", fontSize: 12, marginTop: 7}}>
                                    {moment(msg.timestamp).format('HH:mm')}
                                </Text>
                            )}
                        </View>
                    </View>
                </View>
            )}
        </View>
    )
}

const TextContent = ({content, isSender, senderName, timestamp}: {content: any, isSender: boolean, senderName: any, timestamp}) => {
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
            <Text style={{color: "#95afc0", fontSize: 12, marginTop: 7}}>
                {moment(timestamp).format('HH:mm')}
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
                    <FileContentItem file={file}/>
                </View>
            ))}
        </View>
    )
}

const FileContentItem = ({ file }: { file: string }) => {
    const [metadata, setMetadata] = useState<any>(null);
    const fileName = metadata?.name || 'File Name';
    const arr = metadata?.name?.split('.') || [];
    const fileType = arr.length > 0 ? arr[arr.length - 1] : 'File Type';
    const fileSize = metadata?.size ? (metadata.size / 1024).toFixed(0) + ' KB' : 'File Size';

    useEffect(() => {
        cloudStorage.refFromURL(file).getMetadata()
            .then((metadata) => {
                setMetadata(metadata);
            });
    }, [file]);

    return (
        <>
            <FontAwesomeIcon icon={faFile} size={35} color="#8854d0"/>
            <View>
                <Text
                    style={{borderRadius: 5, color: "#535c68", fontSize: 15, fontWeight: 500}}
                >
                    {fileName}
                </Text>
                <Text
                    style={{borderRadius: 5, marginTop: 5, color: "#535c68", fontSize: 12}}
                >
                    {fileSize} - {fileType}
                </Text>
            </View>
        </>
    )
}

const TextContentReply = ({content, isSender, senderName, foundMessageReply}: {content: any, isSender: boolean, senderName: any, foundMessageReply:any}) => {
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
            <View style={{
                marginBottom:5,
                padding:10,
                paddingRight:20,
                backgroundColor:"#70b9dc",
                flexDirection: 'row',
                borderRadius:10,
            }}>
                <View
                    style={{
                        paddingHorizontal: 2,
                        backgroundColor:'#488bcc',
                        marginRight:10,
                        borderRadius:10,
                    }}
                />
                {foundMessageReply.type === TEXT && (
                    <View>
                        {!isSender && <Text style={{color:'black', marginBottom:5,}}>{senderName}</Text>}
                        <Text style={{color: "#535c68", }}>
                            {foundMessageReply.content}
                        </Text>
                    </View>
                )}
                {foundMessageReply.type === IMAGE && (
                    <ImageContent content={foundMessageReply.content} isSender={isSender} senderName={foundMessageReply.senderName}/>
                )}
                {foundMessageReply.type === FILE && (
                    <FileContent content={foundMessageReply.content} isSender={isSender} senderName={foundMessageReply.senderName}/>
                )}
            </View>
            {!isSender && <Text style={{color:'black', marginBottom:5,}}>{senderName}</Text>}
            <Text style={{color: "#535c68", }}>
                {content}
            </Text>
        </View>
    )
}

const ShareContent = ({content, isSender, senderName, msg}: {content: any, isSender: boolean, senderName: any, msg:any}) => {
    let bc: string;
    if (isSender) {
        bc = "You've forwarded a message"
    } else {
        bc = "Your friend forwarded a message"
    }


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
            <View style={{flexDirection:'row', alignItems:'center', marginBottom:5}}>

                <FontAwesomeIcon icon={faShareFromSquare} size={10} color={"#AAAAAA"} style={{marginRight:5}}/>
                <Text style={{color:'#AAAAAA', fontSize:10}}>
                    {bc}
                </Text>
            </View>
            {msg.type.includes(TEXT) && (
                <View>
                    {!isSender && <Text style={{color:'black', marginBottom:5,}}>{senderName}</Text>}
                    <Text style={{color: "#535c68", }}>
                        {content}
                    </Text>
                </View>
            )}
            {msg.type.includes(IMAGE) && (
                <ImageContent content={content} isSender={isSender} senderName={senderName}/>
            )}
            {msg.type.includes(FILE) && (
                <FileContent content={content} isSender={isSender} senderName={senderName}/>
            )}
            {msg.type.includes(REPLY) && (
                <View>
                    {!isSender && <Text style={{color:'black', marginBottom:5,}}>{senderName}</Text>}
                    <Text style={{color: "#535c68", }}>
                        {content}
                    </Text>
                </View>
            )}
        </View>
    )
}


export {MessageItem}
