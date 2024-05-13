import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    findChat:{
        backgroundColor:"#00a8ff",
        width: "100%",
        flexDirection:'row',
        paddingHorizontal: 10,
        alignItems:'center'
    },
    findChatInput:{
        marginHorizontal:10,
        fontSize:16,
        flex: 1,
    },
    plusButton:{flex:1,
        justifyContent:'center',
        alignItems: 'center'
    },
    body:{
        flex:1,
    },

})

export { styles };
