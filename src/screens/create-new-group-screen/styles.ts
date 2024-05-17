import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    title:{
        width:"100%",
        height:60,
        backgroundColor:"#33CCFF",
        flexDirection:'row',
        paddingHorizontal: 10,
        paddingVertical:5,

    },
    dubbing:{
        flexDirection:'row',
        padding:15,
        width:"100%",

    },
    findView:{
        marginHorizontal:15,
        marginVertical:5,
        backgroundColor:"#DDDDDD",
        flexDirection:'row',
        borderRadius:5,
        alignItems:'center'
    },
    listFriendView:{
        borderTopWidth:1,
        borderColor:"#DDDDDD",
        marginTop:10,
        flex:1
    },
    boxFriend:{
        flexDirection:'row',
        paddingHorizontal:10,
        paddingVertical:10
    },
    checkbox:{
        width:25,
        height:25,
        borderWidth:1,
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center',
    },
    selectCheckbox:{
        backgroundColor:"#33CCFF"
    },
    buttonCreateView:{
        height:100,
        borderTopWidth:1,
        borderColor:"#DDDDDD",
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:15,
        backgroundColor:'white'
    }
})

export {styles};