import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles.ts";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {useState} from "react";


export const FriendRequestScreen = ({navigation}: any) =>{

    const [selection, setSelection] = useState(true);
    const handleReceived = () =>{
        setSelection(true)
    }
    const handleSent = () =>{
        setSelection(false)
    }


    return(
        <View style={styles.container}>
            {/*Title*/}
            <View style={styles.title}>
                <TouchableOpacity
                    style={{marginRight:15, justifyContent:'center'}}
                    onPress={()=>{navigation.goBack()}}
                >
                    <FontAwesomeIcon icon={faArrowLeft} size={30} style={{color:'white'}}/>
                </TouchableOpacity>
                <View style={{justifyContent:'center'}}>
                    <Text style={{fontWeight:'bold', fontSize:20, color:'white'}}>
                        Friend request
                    </Text>
                </View>
            </View>

            {/*Body*/}
            <View style={styles.body}>
                <View style={styles.boxSelection}>
                    <View
                        style={{flex:1, alignItems:'center'}}
                    >
                        <TouchableOpacity
                            style={{flex:1, alignItems:'center', justifyContent:'center'}}
                            onPress={handleReceived}
                        >
                            <Text style={{fontSize:20, color:'black'}}>
                                Received
                            </Text>
                        </TouchableOpacity>
                        <View style={[{width:'90%', height:2},selection?{backgroundColor:'#33CCFF'}:{backgroundColor:'white'}]}/>
                    </View>
                    <View
                        style={{flex:1, alignItems:'center'}}
                    >
                        <TouchableOpacity
                            style={{flex:1, alignItems:'center', justifyContent:'center'}}
                            onPress={handleSent}
                        >
                            <Text style={{fontSize:20, color: 'black'}}>
                                Sent
                            </Text>
                        </TouchableOpacity>
                        <View style={[{ width:'90%', height:2, }, !selection?{backgroundColor:'#33CCFF'}:{backgroundColor:'white'}]}/>
                    </View>
                </View>
                {/*<ScrollView>*/}
                {/*    {selection ? (*/}
                {/*        <ReceivedFriendRequest navigation={navigation} listReceived={listReceived}/>*/}
                {/*    ):(*/}
                {/*        <SentFriendRequest navigation={navigation} listSent={listSent}/>*/}
                {/*    )}*/}
                {/*</ScrollView>*/}
            </View>
        </View>
    )
}