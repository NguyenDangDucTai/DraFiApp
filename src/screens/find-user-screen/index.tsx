import {useEffect, useState} from "react";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "./styles.ts";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {faArrowAltCircleRight} from "@fortawesome/free-solid-svg-icons/faArrowAltCircleRight";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import Entypo from "../../vendor/react-native-vector-icons/Entypo";


export const FindUserScreen = ({navigation}:any) => {

    const [inputSearch, setInputSearch] = useState("");


    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const { data } = await usersInfo.get(`/users`);
                // setUserList(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const [filterSearch, setFilterSearch] = useState([]);
    console.log("USER LIST", userList)

    const handleFindUser = () =>{
        if(userList){
            setFilterSearch(userList.filter((item: any)=>(item.username === inputSearch||item.phone === inputSearch)));
            console.log("Filter Search",filterSearch);
        }

    }


    return(
        <View style={styles.container}>
            <View style={styles.title}>
                <TouchableOpacity
                    style={{marginRight:15, justifyContent:'center'}}
                    onPress={()=>{navigation.goBack()}}
                >
                    <FontAwesomeIcon icon={faArrowLeft}  size={30} color="white" />
                </TouchableOpacity>
                <View style={{justifyContent:'center'}}>
                    <Text style={{fontWeight:'bold', fontSize:20, color:'white'}}>
                        Add friend
                    </Text>
                </View>
            </View>

            <View style={styles.qgView}>
                <View style={styles.backgroundQG}>
                    <Text style={{color:'white', fontWeight:'bold', fontSize:18}}>User name</Text>
                    <Image
                        source={require('../../assets/qgZalo.png')}
                        style={{width:150, height:150, marginVertical:10, borderRadius:5}}
                    />
                    <Text style={{color:'white'}}>Scan the code to add friends to Zalo with me</Text>
                </View>
            </View>

            <View style={styles.findView}>
                <View style={{flex:1, justifyContent:'center'}}>
                    <TextInput
                        onChangeText={setInputSearch}
                        value={inputSearch}
                        style={styles.inputFindUser}
                        placeholder={"Enter username or number phone"}
                        placeholderTextColor={"#CCCCCC"}
                    />
                </View>
                <TouchableOpacity
                    style={styles.btnFind}
                    onPress={handleFindUser}
                >
                    <FontAwesomeIcon icon={faArrowAltCircleRight}  size={30} color="#AAAAAA" />
                </TouchableOpacity>
            </View>
            <View>
                {filterSearch && filterSearch.map((item:any)=>{

                    return(
                        <BoxUser navigation={navigation} key={item.id} item={item}/>
                    )
                })}
            </View>
        </View>
    )
}

const BoxUser = ({item, navigation}:any) =>{
    return(
        <TouchableOpacity
            style={styles.boxUser}
        >
            <Image source={item.profilePicture} style={{width:50, height:50, borderRadius:100}}/>
            <Text style={{fontSize:16, marginLeft:15, fontWeight:'bold', flex:1}}>
                {item.display_name}
            </Text>
            <TouchableOpacity
                style={{paddingVertical:5, paddingHorizontal:10, backgroundColor:"#66c2db", borderRadius:10}}
            >
                <Text style={{color:'white', fontWeight:'bold'}}>
                    Add friend
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}