import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    container: {
        flex:1
    },
    backgroundView:{
        width:"100%",
        height:200,
    },
    backgroundImage:{
        width:"100%",
        height:"100%",
    },
    avatarView:{
        alignItems:'center',
        zIndex:5,
        top: -50,
    },
    behindAvatar:{
        backgroundColor:'white',
        padding:3,
        borderRadius:100
    },
    btnChat:{
        marginTop:10,
        width:200,
        paddingVertical:10,
        backgroundColor:"#33CCFF",
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:100,
        marginRight:15
    },
    btnRequestFriend:{
        marginTop:10,
        paddingVertical:10,
        paddingHorizontal:25,
        backgroundColor:"#00a8ff",
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:100,
    },
    btnRefuseFriend:{
        marginTop:10,
        paddingVertical:10,
        paddingHorizontal:25,
        backgroundColor:"#FF0000",
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:100,
    },

})

export {styles};