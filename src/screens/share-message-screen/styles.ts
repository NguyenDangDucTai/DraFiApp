import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title:{
        flexDirection: "row",
        alignItems:'center',
        backgroundColor:'white',
        paddingVertical:10,
        paddingHorizontal:10,
        marginBottom:5,
    },
    searchView:{
        backgroundColor:'white',
        paddingVertical:5,
        paddingHorizontal:5,
        marginBottom:5,
    },
    findChat:{
        backgroundColor:"white",
        width: "100%",
        flexDirection:'row',
        paddingHorizontal: 10,
        alignItems:'center',
        height:50,
        marginBottom:5,
    },
    findChatInput:{
        marginHorizontal:10,
        fontSize:16,
        flex: 1,
        color:'black'
    },
    listRoom:{
        backgroundColor:'white',
        padding:10,
    },
    checkBox:{
        borderRadius:100,
        height:25,
        width:25,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center'
    },
    viewSend:{
        backgroundColor:'white',
        padding:15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 15,
    },
    imageList:{
        flexDirection:'row',
    }



})

export { styles };
