import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    message:{
        width:"100%",
        backgroundColor:'white',
        flexDirection:'row',
        paddingHorizontal: 20,
        paddingVertical: 17,
        gap: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f5f6fa'
    },
    img:{
        justifyContent: "center",
        height: "100%",
        paddingHorizontal:15
    },
    body:{
        borderBottomWidth:1,
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
        paddingRight:10
    }
})

export { styles }
