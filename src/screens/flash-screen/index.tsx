import {Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect} from "react";
import {login} from "../../api/authApi.ts";
import {setUser} from "../../redux/action.ts";
import {ROUTING_HOME_CHAT, ROUTING_LOGIN} from "../../navigation/path.ts";
import {useDispatch} from "react-redux";
import {DRAFI_APP_LOGIN} from "../../constants/LocalStorageKey.ts";

const FlashScreen = ({navigation}: any) => {
    const dispatch = useDispatch();

    const handleLogin = (data: { username: string, password: string }) => {
        login(data)
            .then((res) => {
                dispatch(setUser(res.data.user_info));
                navigation.reset({
                    index: 0,
                    routes: [{ name: ROUTING_HOME_CHAT }]
                });
            })
            .catch((error) => {
                console.error(error.response.data);
            })
    }

    useEffect(() => {
        const getLoginInfo = async () => {
            const loginInfo = await AsyncStorage.getItem(DRAFI_APP_LOGIN);
            if (loginInfo) {
                const data: { username: string, password: string } = JSON.parse(loginInfo);
                handleLogin(data);
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: ROUTING_LOGIN }]
                });
            }
        };

        getLoginInfo();
    }, []);

    return (
        <View style={{
            backgroundColor: "#00a8ff",
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }} >
            <Text style={{ fontSize: 40, fontWeight: 800, color: 'white', marginBottom: 5, }}>
                DraFi App
            </Text>
            <Text style={{ fontSize: 17, fontWeight: 500, color: 'white' }} >Ứng dụng được phát triển bởi Nhóm 5</Text>
        </View>
    )
}

export { FlashScreen }
