import {useSelector} from "react-redux";
import {useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {LIST_ALL_CHATS} from "../../constants/QueryKey.ts";
import {Animated, Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles.ts";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import ScrollView = Animated.ScrollView;
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons/faUserPlus";
import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
import {faBell} from "@fortawesome/free-solid-svg-icons/faBell";
import {faUsers} from "@fortawesome/free-solid-svg-icons/faUsers";
import {faGear} from "@fortawesome/free-solid-svg-icons/faGear";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {faSignOut} from "@fortawesome/free-solid-svg-icons/faSignOut";
import {firestore} from "../../configs/FirebaseConfig.ts";
import {ROUTING_TAB} from "../../navigation/path.ts";


export const InfoGroupRoomScreen = ({navigation, route}:any) =>{
    const { chatId, roomChat } = route.params;
    const user = useSelector((state: any) => state.userData);
    const userId = user.id;
    const queryClient = useQueryClient();
    const picture = roomChat.picture;

    const [participants, setParticipants] = useState<any>([]);
    const [mangerId, setMangerId] = useState<any>();
    const [settingGroup, setSettingGroup] = useState<any>({
        allowSendMessage: true,
        allowAddMember: true,
    });


    useEffect(() => {
        firestore.collection("Chats")
            .doc(chatId)
            .get()
            .then((snapshot:any) => {
                setParticipants(snapshot.data().participants);
                setMangerId(snapshot.data().managerId)
                setSettingGroup(snapshot.data()?.setting? snapshot.data().setting: {
                    allowSendMessage: true,
                    allowAddMember: true,
                })
            })
    }, [chatId]);

    const handleExitGroup = () =>{

        if(mangerId === userId){
            firestore.collection("Chats")
                .doc(chatId)
                .delete()
                .then((snapshot) => {
                queryClient.invalidateQueries({ queryKey: [LIST_ALL_CHATS] });
                navigation.navigate()
            })
                .catch((error) => {
                    console.error('LỖI THÊM THÀNH VIÊN VÀO NHÓM', error);
                });
        } else {
            firestore.collection("Chats")
                .doc(chatId)
                .update("participants", [...participants.filter((user:any) => user !== userId)])
                .then((snapshot) => {
                    queryClient.invalidateQueries({ queryKey: [LIST_ALL_CHATS] });
                    navigation.navigate("HomeChat")
                })
                .catch((error) => {
                    console.error('LỖI THÊM THÀNH VIÊN VÀO NHÓM', error);
                });
        }
        navigation.navigate(ROUTING_TAB)
    }
    const handleSettingGroup =()=>{
        navigation.navigate("SettingGroup",{chatId})
    }

    return(
        <View style={styles.container}>

            {/*Title*/}
            <View style={styles.title}>
                <TouchableOpacity
                    style={{marginRight:15, justifyContent:'center'}}
                    onPress={()=>{navigation.goBack()}}
                >
                    <FontAwesomeIcon icon={faArrowLeft} size={30} color="white" />
                </TouchableOpacity>
                <View style={{justifyContent:'center'}}>
                    <Text style={{fontWeight:'bold', fontSize:20, color:'white'}}>
                        Setting
                    </Text>
                </View>
            </View>

            {/*Body*/}
            <ScrollView style={{flex:1}}>
                {/*Box 1*/}
                <View style={styles.box}>
                    <View style={{alignItems:'center'}}>
                        <Image
                            source={{uri: picture}}
                            style={{width:100, height:100, borderRadius:100, marginBottom:10}}
                        />
                        <Text style={{fontWeight:'bold'}}>DORAEMON</Text>
                    </View>
                    <View style={{width:"100%", paddingTop:15, paddingHorizontal:10, flexDirection:'row', justifyContent:"space-between"}}>
                        {/*Search*/}
                        <TouchableOpacity
                            style={{alignItems:'center'}}
                            // onPress={}
                        >
                            <View style={styles.button}>
                                <FontAwesomeIcon icon={faSearch} size={20} color="black" />
                            </View>
                            <View style={{alignItems:'center', marginTop:5}}>
                                <Text style={{color:'black'}}>Search</Text>
                                <Text style={{color:'black'}}>message</Text>
                            </View>
                        </TouchableOpacity>
                        {/*Personal page */}
                        <TouchableOpacity
                            style={{alignItems:'center'}}
                            disabled={mangerId !== userId && !settingGroup.allowAddMember}
                            onPress={()=>{navigation.navigate("AddMember", {
                                chatId: chatId
                            })}}
                        >
                            <View style={styles.button}>
                                <FontAwesomeIcon icon={faUserPlus} size={20} style={mangerId !== userId && !settingGroup.allowAddMember ? {color:'white'} :{color:'black'}} />
                            </View>
                            <View style={{alignItems:'center', marginTop:5}}>
                                <Text style={{color:'black'}}>Add</Text>
                                <Text style={{color:'black'}}>member</Text>
                            </View>
                        </TouchableOpacity>
                        {/*Change background*/}
                        <TouchableOpacity
                            style={{alignItems:'center'}}
                            // onPress={}
                        >
                            <View style={styles.button}>
                                <FontAwesomeIcon icon={faPencil} size={20} color="black" />
                            </View>
                            <View style={{alignItems:'center', marginTop:5}}>
                                <Text style={{color:'black'}}>Change</Text>
                                <Text style={{color:'black'}}>avatar</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{alignItems:'center'}}
                            // onPress={}
                        >
                            <View style={styles.button}>
                                <FontAwesomeIcon icon={faBell} size={20} color="black" />
                            </View>
                            <View style={{alignItems:'center', marginTop:5}}>
                                <Text style={{color:'black'}}>Turn off</Text>
                                <Text style={{color:'black'}}>notification</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{flex:1, marginTop:15, backgroundColor:'white'}}>
                    <TouchableOpacity
                        style={styles.viewTouchable}
                        onPress={()=>{navigation.navigate("SeeMembers", {
                            chatId: chatId
                        })}}
                    >
                        <FontAwesomeIcon icon={faUsers} size={25} color="black" />
                        <View style={styles.viewTitleTouchable}>
                            <Text style={{fontSize:18, color:'black'}}>
                                See members
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {mangerId === userId &&(
                        <TouchableOpacity

                            style={styles.viewTouchable}
                            onPress={handleSettingGroup}
                        >
                            <FontAwesomeIcon icon={faGear} size={25} color="black" />
                            <View style={styles.viewTitleTouchable}>
                                <Text style={{fontSize:18, color:"black"}}>
                                    Setting group
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.viewTouchable}>
                        <FontAwesomeIcon icon={faTrash} size={24} color="red" />
                        <View style={styles.viewTitleTouchable}>
                            <Text style={{fontSize:18, color:'red'}}>
                                Delete chats history
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.viewTouchable}
                        onPress={handleExitGroup}
                    >
                        <FontAwesomeIcon icon={faSignOut} size={24} color="red" />
                        <View style={styles.viewTitleTouchable}>
                            <Text style={{fontSize:18, color:"red"}}>
                                Exit group
                            </Text>
                        </View>
                    </TouchableOpacity>


                </View>


            </ScrollView>

        </View>
    )
}