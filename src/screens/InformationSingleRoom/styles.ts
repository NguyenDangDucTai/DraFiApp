import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    container: {
        flex:1
    },
    title:{
        width:"100%",
        height:60,
        backgroundColor:"#33CCFF",
        flexDirection:'row',
        paddingHorizontal: 10,
        paddingVertical:5,

    },
    box:{
        backgroundColor:'white',
        width:'100%',
        marginBottom:10,
        padding:20,
    },
    button:{
        backgroundColor:'#DDDDDD',
        borderRadius:100,
        width:40,
        height:40,
        alignItems:'center',
        justifyContent:'center'
    }
})

export {styles};