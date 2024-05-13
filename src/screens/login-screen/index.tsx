import {ImageBackground, Text, View} from "react-native";

import {styles} from "./styles.ts";
import {useForm} from "react-hook-form";
import {FormInput} from "../../components/form-input";
import {Button} from "../../components/button";
import {login} from "../../api/authApi.ts";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/action.ts";
import {ROUTING_HOME_CHAT} from "../../navigation/path.ts";


interface LoginInput {
    username: string;
    password: string;
}

const logoGoogle = { uri: 'https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png' };

const LoginScreen = ({ navigation }: any) => {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginInput>({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const dispatch = useDispatch();

    const onSubmit = (data: any) => {
        console.log(data);

        login(data)
            .then((res) => {
                console.log(res.data.user_info);
                dispatch(setUser(res.data.user_info));
                navigation.navigate(ROUTING_HOME_CHAT);
            })
            .catch((error) => {
                console.error(error.response.data);
            })
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../../assets/login/backgroundLogin.png")} resizeMode='cover' style={styles.imageBackground}>
                <View style={styles.body}>
                    <FormInput
                        style={{ width: '90%', marginVertical: 5 }}
                        label={"USERNAME"}
                        labelStyle={{ color: 'white', fontWeight: 'bold' }}
                        inputStyle={styles.inputLogin}
                        control={control}
                        name="username"
                        errors={errors}
                        rules={{
                            required: "Please enter username"
                        }}
                    />

                    <FormInput
                        style={{ width: '90%', marginVertical: 5 }}
                        label={"PASSWORD"}
                        labelStyle={{ color: 'white', fontWeight: 'bold' }}
                        inputStyle={styles.inputLogin}
                        isSecureText={true}
                        control={control}
                        name="password"
                        errors={errors}
                        rules={{
                            required: "Please enter password"
                        }}
                    />

                    <View style={{ width: '90%', marginVertical: 5, alignItems: 'center' }}>
                        <Button
                            style={styles.buttonLogin}
                            textStyle={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}
                            onClick={handleSubmit(onSubmit)}
                            text="Login"
                        />
                    </View>
                    <View>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>OR</Text>
                    </View>
                    <View style={{ width: '90%', marginVertical: 5, alignItems: 'center' }}>
                        <Button
                            style={styles.buttonLoginWithGoogle}
                            textStyle={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}
                            text="Login with Google"
                            icon={logoGoogle}
                            iconPosition="left"
                            iconStyle={styles.logoGoogle}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export { LoginScreen }
