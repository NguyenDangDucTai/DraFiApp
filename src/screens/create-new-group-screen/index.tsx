import {useSelector} from "react-redux";
import {useListParticipants} from "../../api/useListParticipants.ts";
import useCreateGroupChat from "../../api/useCreateGroupChat.ts";
import {useEffect, useState} from "react";
import {Image, Text, TextInput, TouchableOpacity, View, Animated} from "react-native";
import ScrollView = Animated.ScrollView;
import {styles} from "./styles.ts";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {faArrowCircleRight} from "@fortawesome/free-solid-svg-icons/faArrowCircleRight";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";


export const CreateNewGroupScreen = ({navigation}:any) => {


    const user = useSelector((state:any) => state.userData);
    const userId = user.id;
    const { participants } = useListParticipants(userId);

    const createGroupChat = useCreateGroupChat();

    const [groupName, setGroupName] = useState("");
    const [viewButton, setViewButton] = useState(false);
    const [disableButtonCreate, setDisableButtonCreate] = useState(true)
    const [listAddInGroupId, setListAddInGroupId] = useState([]);
    const [avatarGroup, setAvatarGroup] = useState("https://firebasestorage.googleapis.com/v0/b/chatservice-d1f1c.appspot.com/o/avatars%2FavatarGroup.jpg?alt=media&token=cc85e7a4-6bbc-40d2-941c-313db77a2745");

    console.log('PPPPP', participants);

    // const listFriend = {};
    useEffect(()=>{
        if(listAddInGroupId.length > 0 && !viewButton){
            setViewButton(!viewButton)
        } else {
            setViewButton(!viewButton)
        }
        if(listAddInGroupId.length >= 2){
            setDisableButtonCreate(false)
        } else {
            setDisableButtonCreate(true);
        }

    }, [listAddInGroupId]);

    const handleCreateGroup = () =>{
        const listMemberIds = {};
        for(const item of listAddInGroupId) {
            item.participants.forEach(participantId => {
                listMemberIds[participantId] = true;
            })
        }

        console.log(listMemberIds);
        console.log(Object.keys(listMemberIds));

        createGroupChat({
            groupName: groupName,
            participantIdList: Object.keys(listMemberIds),
            type: "public",
            picture: "https://firebasestorage.googleapis.com/v0/b/chatservice-d1f1c.appspot.com/o/avatars%2FavatarGroup.jpg?alt=media&token=cc85e7a4-6bbc-40d2-941c-313db77a2745",
            managerId: userId,
        });
        navigation.navigate("HomeChat");
    }

    return(
        <View style={styles.container}>
            <View style={styles.title}>
                <TouchableOpacity
                    style={{marginRight:15, justifyContent:'center'}}
                    onPress={()=>{navigation.goBack()}}
                >
                    <FontAwesomeIcon icon={faArrowLeft} size={30} style={{color:'white'}}/>
                </TouchableOpacity>
                <View style={{justifyContent:'center'}}>
                    <Text style={{fontWeight:'bold', fontSize:20, color:'white'}}>
                        Create new group
                    </Text>
                </View>
            </View>
            <View style={styles.dubbing}>
                <TouchableOpacity>
                    <Image
                        source={{uri: avatarGroup}}
                        style={{width:50, height:50, borderRadius:100}}
                    />

                </TouchableOpacity>
                <View style={{marginLeft:10, justifyContent:'center'}}>
                    <TextInput
                        placeholder={"Name the group"}
                        placeholderTextColor={"#CCCCCC"}
                        value={groupName}
                        onChangeText={setGroupName}
                        style={{outlineStyle:'none', fontSize:18, borderBottomWidth:1, color: 'black'}}
                    />

                </View>
                <View style={{marginLeft:20, justifyContent:'center'}}>
                    {groupName !== "" &&(
                        <FontAwesomeIcon icon={faCheck} size={35} color="blue"/>
                    )}
                </View>
            </View>
            <View style={styles.findView}>
                {/*<FontAwesome*/}
                {/*    style={{marginHorizontal:10}}*/}
                {/*    name="search" size={28} color="#AAAAAA"*/}
                {/*/>*/}
                <View style={{flex:1}}>
                    <TextInput
                        placeholder={"Enter display name or phone number"}
                        placeholderTextColor={"#AAAAAA"}
                        style={{
                            color: 'black',
                            paddingHorizontal:10
                        }}

                    />
                </View>
            </View>

            <ScrollView
                keyboardDismissMode={"on-drag"}
                style={styles.listFriendView}>
                {participants?(
                    participants.map((item: any)=>{
                        const chatId = item.chatId;
                        const participantIndex = item.participants.indexOf(userId);
                        const friendId = item.participants[participantIndex];
                        const friendName = item.name.split('/')[participantIndex];
                        const picture = item.picture;
                        const type = item.type;

                        const friendItem = {
                            id: chatId,
                            image: picture,
                            displayName: friendName,
                            userName: friendName,
                            participants: item.participants,
                        }
                        return(
                            type !== 'public' && <ListFriendView key={friendItem.id} item={friendItem} setListAddInGroupId={setListAddInGroupId}/>
                        )
                    })
                ):(
                    <NoFriendView/>
                )}
            </ScrollView>

            {listAddInGroupId.length > 0 &&(
                <View style={styles.buttonCreateView}>
                    <ScrollView
                        style={{flex:1, marginRight:15}}
                        horizontal={true}
                    >
                        {listAddInGroupId.map((item: any, i)=>{
                            return(
                                <Image
                                    key={i}
                                    // source={{uri: item.image}}
                                    source={{uri: avatarGroup}}
                                    style={{width:50, height:50, marginRight: 10, borderRadius:100,}}
                                />
                            )
                        })}
                    </ScrollView>
                    <TouchableOpacity
                        onPress={handleCreateGroup}
                        disabled={disableButtonCreate}
                    >
                        <FontAwesomeIcon icon={faArrowCircleRight} size={50} color="#33CCFF"/>
                    </TouchableOpacity>
                </View>

            )}

        </View>
    )


}

const ListFriendView = ({item, setListAddInGroupId}:any) =>{
    const [changeCheckbox, setChangeCheckbox] = useState(false);


    const handleSelectCheckbox = () =>{
        setChangeCheckbox(!changeCheckbox)
        if(!changeCheckbox){
            setListAddInGroupId(pre => {
                const list = [...pre];
                list.push(item);
                return list;
            })
        } else {
            setListAddInGroupId(pre => {
                const list = [...pre];
                const findItemRemove = list.find(item=>item.id === item.id);
                if(findItemRemove !== -1){
                    list.splice(findItemRemove, 1);
                }
                return list;
            })
        }
    }

    // const image = item.image.split("|")[0]


    return(
        <View style={styles.boxFriend}>
            <Image
                source={{uri: item.image}}
                style={{width:50, height:50, borderRadius:100}}
            />
            <View style={{flex:1, marginLeft:10, justifyContent:'center'}}>
                <Text style={{fontSize:20, fontWeight:'bold', color:'black'}}>
                    {item.displayName}
                </Text>
            </View>
            <View style={{justifyContent:'center', marginRight:10}}>
                <TouchableOpacity
                    style={[styles.checkbox, changeCheckbox && styles.selectCheckbox]}
                    onPress={handleSelectCheckbox}
                >
                    {changeCheckbox &&(
                        <FontAwesomeIcon icon={faCheck} size={15} color="white"/>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const  NoFriendView = () =>{
    return(
        <View style={{alignItems:'center', paddingTop:20}}>
            <Image
                source={require("../../assets/listFriend.png")}
                style={{width:200, height:200}}
            />
            <Text>You have no friends</Text>
        </View>
    )
}