import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    message:{
        flex:1,
        backgroundColor:'white',
        flexDirection:'row',
        borderRadius:10,
        marginHorizontal:10,
        marginVertical:5,
        alignContent:'center',
        paddingVertical:5,

    },
    img:{
        justifyContent: "center",
        height: "100%",
        paddingHorizontal:15
    },
    body:{
        borderColor:'#BBBBBB',
        flex:1,
        paddingVertical:10,
        flexDirection:'row'
    },
    content:{
        flex:1
    },
    time:{
        width:60,
        height:"100%",
        alignItems:'flex-end',
        paddingRight:10,
    },
    messageUR:{
        backgroundColor:"red",
        color:"white",
        fontWeight:"bold",
        paddingVertical:2,
        paddingHorizontal:5,
        borderRadius:10,
        fontSize:10,
        marginTop:5,
    }
})

export { styles }
