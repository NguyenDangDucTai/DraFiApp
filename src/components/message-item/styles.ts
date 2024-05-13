import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    messageBoxReceiver:{
        margin: 10,
        columnGap: 7,
    },
    messageReceiver:{
        backgroundColor:'white',
        marginLeft:5,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius:10,
    },
    messageFile:{
        backgroundColor:'white',
        marginBottom:5,
        borderRadius:10,
    },
    messageBoxSender:{
        flex:1,
        flexDirection: 'row-reverse',
        alignItems:'flex-end'
    },
    editMessage:{
        marginTop:5,
        flexDirection: 'row-reverse',
        alignItems:'flex-end'
    },
    messageSenderText:{
        maxWidth:"70%",
        backgroundColor:'#CCCCFF',
        marginLeft:5,
        padding:10,
        borderRadius:10,
    },
    messageSenderImage:{
        maxWidth:"70%",
        backgroundColor:'#CCCCFF',
        marginLeft:5,
        padding:10,
        borderRadius:10,
    },
})

export {styles};
