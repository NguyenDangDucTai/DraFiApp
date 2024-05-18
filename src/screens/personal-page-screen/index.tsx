import {styles} from "./styles.ts";
import {Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faMessage } from '@fortawesome/free-solid-svg-icons/faMessage';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
import { faUserXmark } from '@fortawesome/free-solid-svg-icons/faUserXmark';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import useGetUserInfo from "../../api/useGetUserInfo.ts";


export const PersonalPageScreen = ({navigation, route}:any)=>{

    const checkFriend  = false;
    const {userId} = route.params;
    const user = useGetUserInfo((userId));
    console.log("User personal page", user)

    const handleChat = ()  =>{

    }

    //Xử lý button kết bạn
    const handleRequestFriend = ()  =>{

    }

    // Xử lý button hủy kết bạn
    const handleRefuseFriend = ()  =>{

    }



    return(
        <View style={styles.container}>
            <View style={styles.backgroundView}>
                <ImageBackground
                    style={styles.backgroundImage}
                    source={require('../../assets/backgroundImage.png')}
                >
                    <TouchableOpacity
                        style={{marginTop:10, marginLeft:10}}
                        onPress={() => navigation.goBack()}
                    >
                        <FontAwesomeIcon icon={faArrowLeft}  size={30} color="white" />
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            <View style={styles.avatarView}>
                <View style={styles.behindAvatar}>
                    <Image
                        source={{uri: user.userInfo.avatar}}
                        style={{width: 100, height: 100, borderRadius:100}}
                    />
                </View>
                <Text style={{fontWeight:'bold', fontSize:20, color:'black'}}>
                    {user.userInfo.display_name}
                </Text>
                <View style={{flexDirection:'row'}}>
                    {!checkFriend?(
                        <TouchableOpacity
                            style={styles.btnRequestFriend}
                            onPress={handleRequestFriend}
                        >
                            <FontAwesomeIcon icon={faUserPlus} size={24} color="white" />
                        </TouchableOpacity>
                    ):(
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity
                                style={styles.btnChat}
                                onPress={handleChat}
                            >
                                <FontAwesomeIcon icon={faMessage} size={20} color="black" />
                                <Text style={{fontWeight:'bold', fontSize:18, marginLeft:10}}>Chat</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnRefuseFriend}
                                onPress={handleRefuseFriend}
                            >
                                <FontAwesomeIcon icon={faUserXmark} size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    )}

                </View>
            </View>
            <View style={{alignItems: "center"}}>
                <Text>Chưa có hoạt động</Text>
            </View>
        </View>
    )


}