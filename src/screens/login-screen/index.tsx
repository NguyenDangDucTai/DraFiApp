import {Text, View} from "react-native";

import {styles} from "./styles.ts";
import {useForm} from "react-hook-form";
import {FormInput} from "../../components/form-input";
import {Button} from "../../components/button";
import {login} from "../../api/authApi.ts";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/action.ts";
import {ROUTING_HOME_CHAT, ROUTING_TAB} from "../../navigation/path.ts";
import React from "react";
import {CheckBox} from "../../components/checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {DRAFI_APP_LOGIN} from "../../constants/LocalStorageKey.ts";


interface LoginInput {
    username: string;
    password: string;
}

const logoGoogle = {uri: 'https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png'};

const LoginScreen = ({navigation}: any) => {
    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginInput>();

    const [rememberLogin, setRememberLogin] = React.useState(false);

    const dispatch = useDispatch();

    const handleLogin = (data: LoginInput) => {
        login(data)
            .then((res) => {
                if (rememberLogin) {
                    AsyncStorage.setItem(DRAFI_APP_LOGIN, JSON.stringify(data));
                }

                console.log(res.data.user_info);
                dispatch(setUser(res.data.user_info));
                navigation.reset({
                    index: 0,
                    routes: [{ name: ROUTING_TAB }]
                });
            })
            .catch((error) => {
                console.error(error.response.data);
            })
    }

    const onSubmit = (data: any) => {
        console.log(data);
        handleLogin(data);
    };

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white'
        }}>
            <View style={{
                width: '100%',
                paddingHorizontal: 10,
            }}>
                <Text style={{
                    fontSize: 30,
                    fontWeight: '800',
                    textAlign: 'center',
                    color: '#2c3e50',
                    marginBottom: 20,
                }}>
                    LOGIN
                </Text>

                <FormInput
                    style={{paddingHorizontal: 20, marginBottom: 15}}
                    label={"Tên đăng nhập"}
                    labelStyle={{color: '#7f8c8d', fontWeight: 500, marginBottom: 5, marginLeft: 20, fontSize: 13}}
                    inputStyle={{
                        borderRadius: 300,
                        borderColor: '#bdc3c7',
                        borderWidth: 1,
                        paddingHorizontal: 20,
                        paddingVertical: 7,
                        color: '#2c3e50',
                        fontSize: 15
                    }}
                    control={control}
                    name="username"
                    errors={errors}
                    rules={{
                        required: "Vui lòng nhập tên đăng nhập"
                    }}
                />

                <FormInput
                    style={{paddingHorizontal: 20, marginBottom: 15}}
                    label={"Mật khẩu"}
                    labelStyle={{color: '#7f8c8d', fontWeight: 500, marginBottom: 5, marginLeft: 20, fontSize: 13}}
                    inputStyle={{
                        borderRadius: 300,
                        borderColor: '#bdc3c7',
                        borderWidth: 1,
                        paddingHorizontal: 20,
                        paddingVertical: 7,
                        color: '#2c3e50',
                    }}
                    isSecureText={true}
                    control={control}
                    name="password"
                    errors={errors}
                    rules={{
                        required: "Vui lòng nhập mật khẩu"
                    }}
                />

                <View style={{paddingHorizontal: 20, flexDirection: 'row'}}>
                    <CheckBox
                        style={{flexDirection: 'row', gap: 7, flex: 1}}
                        label="Ghi nhớ đăng nhập"
                        labelStyle={{fontWeight: 400, fontSize: 14, color: '#34495e'}}
                        value={rememberLogin}
                        onChange={setRememberLogin}
                    />

                    <Button
                        text="Quên mật khẩu?"
                        textStyle={{color: '#74b9ff', fontSize: 14, fontWeight: 500}}
                    />
                </View>

                <Button
                    style={{
                        marginHorizontal: 20,
                        backgroundColor: '#00a8ff',
                        borderRadius: 300,
                        marginBottom: 15,
                        marginTop: 30,
                    }}
                    textStyle={{
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: 500,
                        fontSize: 15,
                    }}
                    onClick={handleSubmit(onSubmit)}
                    text="LOGIN"
                />

                <Button
                    style={{
                        marginHorizontal: 20,
                        backgroundColor: '#2c3e50',
                        borderRadius: 300,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    textStyle={{
                        paddingVertical: 11,
                        paddingHorizontal: 15,
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: 500,
                        fontSize: 15,
                    }}
                    text="Login with Google"
                    icon={logoGoogle}
                    iconPosition="left"
                    iconStyle={styles.logoGoogle}
                />
            </View>
        </View>
    )
}

export {LoginScreen}
