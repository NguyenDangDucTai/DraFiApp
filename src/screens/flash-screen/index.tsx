import {Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect} from "react";
import {login} from "../../api/authApi.ts";
import {setUser} from "../../redux/action.ts";
import {ROUTING_HOME_CHAT, ROUTING_LOGIN, ROUTING_TAB} from "../../navigation/path.ts";
import {useDispatch} from "react-redux";
import {DRAFI_APP_LOGIN} from "../../constants/LocalStorageKey.ts";
import RNFS from 'react-native-fs';

const FlashScreen = ({navigation}: any) => {
    const dispatch = useDispatch();

    const handleLogin = (data: { username: string, password: string }) => {
        login(data)
            .then((res) => {
                dispatch(setUser(res.data.user_info));
                navigation.reset({
                    index: 0,
                    routes: [{ name: ROUTING_TAB }]
                });
            })
            .catch((error) => {
                console.error(error.response.data);
                navigation.reset({
                    index: 0,
                    routes: [{ name: ROUTING_LOGIN }]
                });
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

    const directoryPath = RNFS.DocumentDirectoryPath;
    console.log("path ne: ", directoryPath)

// Đọc danh sách tệp tin trong thư mục
    RNFS.readDir(directoryPath)
        .then((result) => {
            // Lọc ra các tệp tin có đuôi .jpg
            const jpgFiles = result.filter((file) => file.name.endsWith('.jpg'));

            // Log danh sách các tệp tin .jpg
            console.log("file nè: ", jpgFiles);
        })
        .catch((error) => {
            console.error(error);
        });

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
