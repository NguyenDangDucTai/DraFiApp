import {Animated, Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles.ts";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import ScrollView = Animated.ScrollView;


export const InformationSingleRoom = ({navigation, route}:any) =>{

    const roomChat = route.params.roomChat;
    console.log("day la room chat",roomChat)


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
                            // source={require('../../image/chatHome/doraemon.png')}
                            style={{width:100, height:100, borderRadius:100, marginBottom:10}}
                        />
                        <Text style={{fontWeight:'bold', color:'black'}}>DORAEMON</Text>
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
                            // onPress={}
                        >
                            <View style={styles.button}>
                                <FontAwesomeIcon icon={faUser} size={20} color="black" />
                            </View>
                            <View style={{alignItems:'center', marginTop:5}}>
                                <Text style={{color:'black'}}>Personal</Text>
                                <Text style={{color:'black'}}>page</Text>
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
                                <Text style={{color:'black'}}>background</Text>
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
            </ScrollView>

        </View>
    )
}