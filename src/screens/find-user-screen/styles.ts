import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title:{
        width:"100%",
        height:60,
        backgroundColor:"#00a8ff",
        flexDirection:'row',
        paddingHorizontal: 10,
        paddingVertical:5,

    },
    findView:{
        backgroundColor:'white',
        width:'100%',
        paddingHorizontal:5,
        paddingVertical:10,
        flexDirection:'row',
        marginHorizontal:5,

    },
    inputFindUser:{
        height:40,
        fontSize:18,
        borderWidth:1,
        borderRadius:5,
        marginRight:5,
        paddingHorizontal:10,

    },
    btnFind:{
        padding:10,
        alignItems:'center',
        justifyContent:'center',

    },
    qgView:{
        justifyContent:'center',
        alignItems:'center',
        width:"100%",
        paddingVertical:20,
    },
    backgroundQG:{
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"pink",
        paddingVertical:10,
        paddingHorizontal:20
    },
    boxUser:{
        flex:1,
        padding:10,
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:15,
        marginVertical:5,
        borderRadius:10,
        backgroundColor:'white'
    }
})

export {styles};