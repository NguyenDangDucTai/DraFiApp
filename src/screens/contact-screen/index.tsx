import {styles} from "../contact-screen/styles.ts";
import {Text, TouchableOpacity, View, Animated, TextInput} from "react-native";
import ScrollView = Animated.ScrollView;
import {useState} from "react";
import {FriendsComponent} from "../../components/list-friend";
import {GroupsComponent} from "../../components/list-group";
import {FontAwesomeButton} from "../../components/fontawesome-button";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons/faUserPlus";
import {ROUTING_FIND_USER} from "../../navigation/path.ts";

// @ts-ignore
const ContactScreen = ({navigation}) =>{

    const [selection, setSelection] = useState(true);
    const handleFriends = () =>{
        setSelection(true)
    }
    const handleGroups = () =>{
        setSelection(false)
    }
    const handleFindUser = ()=>{
        navigation.navigate(ROUTING_FIND_USER)
    }

    return(
        <View
            style={styles.container}
        >
            <View style={styles.findChat}>
                <FontAwesomeButton icon={{icon: faMagnifyingGlass, color: 'white', size: 19}}/>
                <TextInput
                    style={styles.findChatInput}
                    placeholder={"Search"}
                    placeholderTextColor={"#EEEEEE"}
                />
                <FontAwesomeButton icon={{icon: faUserPlus, color: 'white', size: 20}} onClick={handleFindUser}/>
            </View>
            <View style={styles.body}>
                <View style={styles.boxSelection}>
                    <View
                        style={{flex:1, alignItems:'center'}}
                    >
                        <TouchableOpacity
                            style={{flex:1, alignItems:'center', justifyContent:'center'}}
                            onPress={handleFriends}
                        >
                            <Text style={{fontSize:20, color:'black', fontWeight:'bold'}}>
                                Friends
                            </Text>
                        </TouchableOpacity>
                        <View style={[{width:'90%', height:2}, selection?{backgroundColor:'#33CCFF'}:{backgroundColor:'white'}]}/>
                    </View>
                    <View
                        style={{flex:1, alignItems:'center'}}
                    >
                        <TouchableOpacity
                            style={{flex:1, alignItems:'center', justifyContent:'center'}}
                            onPress={handleGroups}
                        >
                            <Text style={{fontSize:20, color:'black', fontWeight:'bold'}}>
                                Groups
                            </Text>
                        </TouchableOpacity>
                        <View style={[{ width:'90%', height:2, }, !selection?{backgroundColor:'#33CCFF'}:{backgroundColor:'white'}]}/>
                    </View>
                </View>
                <ScrollView>
                    {selection ? (
                        <FriendsComponent navigation={navigation}/>
                    ) : (
                        <GroupsComponent navigation={navigation}/>
                    )}
                </ScrollView>
            </View>
        </View>
    )
}

export {ContactScreen};