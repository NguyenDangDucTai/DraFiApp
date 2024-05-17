import {Image, Text, TouchableOpacity, View} from "react-native";
import {useSelector} from "react-redux";
import {styles} from "./styles.ts";
import {ROUTING_LOGIN} from "../../navigation/path.ts";


const SettingUserScreen = ({navigation}: any) =>{
    const user = useSelector((state: any) => state.userData);
    console.log(user)
    const userId = user.id;
    const userDisplayName = user.display_name;
    const userAvatar = user.avatar;

    // Xử lý edit information
    const handleEdit = () =>{

    }

    const handleChangePassword = () =>{
        // navigation.navigate("ChangePassword")
    }
    const handleDeleteAccount = () =>{

    }
    const handleLogout = () =>{
        navigation.navigate(ROUTING_LOGIN)
    }

    const handleGoPage = () =>{
        // navigation.navigate("MyUser", {user})
    }




    return(
        <View style={styles.container}>
            <View style={styles.title}>
                <View style={{justifyContent:'center'}}>
                    <Text style={{fontWeight:'bold', fontSize:20, color:'white'}}>
                        Setting user
                    </Text>
                </View>
            </View>

            <View style={[styles.bodyView, {marginBottom:10}]}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleGoPage}
                >
                    <Image source={{uri: userAvatar}} style={{width:50, height:50, borderRadius:100}}/>
                    <View style={{marginLeft:10}}>
                        <Text style={{color:"black"}}>
                            {userDisplayName}
                        </Text>
                        <Text style={{color:"#BBBBBB"}}>
                            See personal page
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.bodyView}>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleEdit}
                >
                    {/*<FontAwesome name="pencil-square-o" size={30} color="blue" />*/}
                    <View style={{flexDirection:'row', flex:1, height:'100%', borderBottomWidth:1, alignItems:'center', paddingRight:20}}>
                        <View style={{flex:1, justifyContent:'center', marginLeft:15, }}>
                            <Text style={{fontSize:15, color:"black"}}>
                                Edit personal information
                            </Text>
                        </View>
                        {/*<AntDesign name="right" size={20} color="#CCCCCC" />*/}
                    </View>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.button}
                    onPress={handleChangePassword}
                >
                    {/*<Feather name="lock" size={30} color="blue" />*/}
                    <View style={{flexDirection:'row', flex:1, height:'100%', borderBottomWidth:1, alignItems:'center', paddingRight:20}}>
                        <View style={{flex:1, justifyContent:'center', marginLeft:15, }}>
                            <Text style={{fontSize:15, color:"black"}}>
                                Change password
                            </Text>
                        </View>
                        {/*<AntDesign name="right" size={20} color="#CCCCCC" />*/}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleDeleteAccount}
                >
                    {/*<AntDesign name="delete" size={30} color="red" />*/}
                    <View style={{flexDirection:'row', flex:1, height:'100%', alignItems:'center', paddingRight:20}}>
                        <View style={{flex:1, justifyContent:'center', marginLeft:15, }}>
                            <Text style={{fontSize:15, color:"black"}}>
                                Delete the account
                            </Text>
                        </View>
                        {/*<AntDesign name="right" size={20} color="#CCCCCC" />*/}
                    </View>
                </TouchableOpacity>


                <View style={[styles.button, {marginTop:10, padding:20}]}>
                    <TouchableOpacity
                        style={styles.buttonLogOut}
                        onPress={handleLogout}
                    >
                        {/*<SimpleLineIcons name="logout" size={20} color="black" />*/}
                        <Text style={{fontWeight:'bold', fontSize:20, marginLeft:10, color:"black"}}>
                            Log out
                        </Text>
                    </TouchableOpacity>
                </View>



            </View>

        </View>
    )
}

export {SettingUserScreen};