import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    imageBackground: {
    },
    body:{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '500',
        paddingVertical:15,
        backgroundColor: 'yellow',
    },
    inputLogin:{
        color:'black',
        backgroundColor:'white',
        borderRadius:5,
        height:'40px',
        marginVertical:5,
        fontWeight:"bold",
        paddingHorizontal:5,
        fontSize:15,

    },
    buttonLogin:{
        marginVertical:5,
        backgroundColor:'#00BFFF',
        width:"90%",
        height:"45px",
        borderRadius:5,
        alignItems:"center",
        justifyContent:"center",
    },
    buttonLoginWithGoogle:{
        marginVertical:5,
        backgroundColor:'#363636',
        width:"90%",
        height:"45px",
        borderRadius:5,
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
    },
    logoGoogle:{
        width: 20,
        height: 20,
        marginHorizontal: 5,
    }
});

export { styles };
