import {Animated, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles.ts";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {useEffect, useState} from "react";
import ScrollView = Animated.ScrollView;
import {ReceivedFriendRequest} from "../../components/ReceivedFriendRequest";
import useListAllAddFriendRequestReceived from "../../api/useListAllAddFriendRequestReceived.ts";
import {useSelector} from "react-redux";
import {SentFriendRequest} from "../../components/SentFriendRequest";
import useListAllAddFriendRequestSender from "../../api/useListAllAddFriendRequestSender.ts";
import add = Animated.add;


export const FriendRequestScreen = ({navigation}: any) =>{


    const user = useSelector((state: any) => state.userData);
    const userId = user.id;
    // const userId = "92b06fbc-26fd-42ab-ba51-28374fa619ee";

    // const { addFriendRequestReceivedList } = useListAllAddFriendRequestReceived(userId);
    // const { addFriendRequestSenderList } = useListAllAddFriendRequestSender(userId);
    //
    //
    // const [listReceived, setListReceived] = useState();
    // const [listSender, setListSender] = useState();
    //
    // useEffect(() => {
    //     setListSender(addFriendRequestSenderList)
    // }, [addFriendRequestSenderList]);
    // useEffect(() => {
    //     setListReceived(addFriendRequestReceivedList);
    // }, [addFriendRequestReceivedList]);
    //
    // console.log("Receiver: ", listReceived)
    // console.log("Sender: ", listSender)



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
                                Đã nhận
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
                                Đã gửi
                            </Text>
                        </TouchableOpacity>
                        <View style={[{ width:'90%', height:2, }, !selection?{backgroundColor:'#33CCFF'}:{backgroundColor:'white'}]}/>
                    </View>
                </View>
                <ScrollView>
                    {selection ? (
                        <ReceivedFriendRequest navigation={navigation}/>
                    ):(
                        <SentFriendRequest navigation={navigation}/>
                    )}
                </ScrollView>
            </View>
        </View>
    )
}