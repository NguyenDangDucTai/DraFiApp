import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title:{
        width:"100%",
        height:60,
        backgroundColor:"#00a8ff",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    bodyTitle:{
        flex: 1,
        paddingVertical:5
    },
    bodyChat:{
        flex:1,
        backgroundColor: '#ecf0f1',
        flexDirection:'column-reverse'
    },
    textInputChat:{
        flexDirection:'row',
        width:"100%",
        paddingHorizontal: 10,
        alignItems:'center',
        backgroundColor: 'white',
        paddingVertical: 8,
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#f5f6fa',
        borderBottomWidth: 1,
        borderBottomColor: '#f5f6fa',
    },
    sendMessage:{
        marginLeft:10
    },
    sendImage:{

    },
    messageBoxReceiver:{
        flex:1,
        flexDirection: 'row',
        margin:10
    },
    messageReceiver:{
        backgroundColor:'white',
        marginLeft:5,
        padding:10,
        borderRadius:10,
    },
    messageBoxSender:{
        flex:1,
        flexDirection: 'row-reverse',
        margin:10,
        alignItems:'flex-end'
    },
    messageSender:{
        width:"70%",
        backgroundColor:'#CCCCFF',
        marginLeft:5,
        padding:10,
        borderRadius:10,
    },
    checkImage:{
        width:30,
        height:30,
        backgroundColor:'rgba(225, 225, 225, 0.5)',
        borderRadius:100,
        position:'absolute',
        top:5,
        right:5,
        borderWidth:4,
        borderColor:'white',

    },
    btnSendImage:{
        backgroundColor:"#33CCFF",
        width:200,
        height:40,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
    },
    fileView:{
        width:"100%",
        flexDirection:'row',
        paddingHorizontal:10,
        paddingVertical:10,
        borderTopWidth:1,
        borderColor:"#DDDDDD",
        alignItems:'center',
    },
    checkFile:{
        borderWidth:1,
        borderRadius:100,
        width:20,
        height:20,
    }



})

export { styles };
