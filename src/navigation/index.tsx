import {LoginScreen} from "../screens/login-screen";
import {HomeChatScreen} from "../screens/home-chat-screen";
import {NavigationContainer} from "@react-navigation/native";
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import * as ROUTING from "./path.ts";
import {RoomChatScreen} from "../screens/room-chat-screen";
import {CallScreen} from "../screens/call-screen";
import {FlashScreen} from "../screens/flash-screen";
import {ContactScreen} from "../screens/contact-screen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {SettingUserScreen} from "../screens/setting-user-screen";
import {FriendRequestScreen} from "../screens/friend-request-screen";
import {CreateNewGroupScreen} from "../screens/create-new-group-screen";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { faMessage } from '@fortawesome/free-solid-svg-icons/faMessage';
import { faBook } from '@fortawesome/free-solid-svg-icons/faBook';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import {FindUserScreen} from "../screens/find-user-screen";
import {CallConnectionScreen} from "../screens/call-connection-screen";
import {InformationSingleRoom} from "../screens/info-single-room-screen";
import {ScanQrCodeScreen} from "../screens/scan-qr-code-screen"
import ScanQrCodeCompleteScreen from "../screens/scan-qr-code-complete-screen"
import {PersonalPageScreen} from "../screens/personal-page-screen";
import ShareMessageScreen from "../screens/share-message-screen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={ROUTING.ROUTING_FLASH_SCREEN}>
                {/*<Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false,}}/>*/}
                {/*<Stack.Screen name='Details' component={DetailsScreen} options={{headerShown: false,}}/>*/}
                <Stack.Screen name={ROUTING.ROUTING_FLASH_SCREEN} component={FlashScreen} options={{headerShown: false,}}/>
                <Stack.Screen name={ROUTING.ROUTING_LOGIN} component={LoginScreen} options={{headerShown: false,}}/>
                {/*<Stack.Screen name='Register' component={Register} />*/}
                {/*<Stack.Screen name='ForgotPassword' component={ForgotPassword} />*/}
                {/*<Stack.Screen name="SuccessRegister" component={SuccessRegister} options={{ headerShown: false, }} />*/}
                <Stack.Screen name={ROUTING.ROUTING_TAB} component={MyTab} options={{headerShown: false,}}/>
                <Stack.Screen name={ROUTING.ROUTING_ROOM_CHAT} component={RoomChatScreen} options={{ headerShown: false, }}/>
                <Stack.Screen name={ROUTING.ROUTING_CALL_CONNECTION_SCREEN} component={CallConnectionScreen} options={{ headerShown: false, }}/>
                <Stack.Screen name={ROUTING.ROUTING_CALL} component={CallScreen} options={{ headerShown: false, }}/>
                <Stack.Screen name={ROUTING.ROUTING_INFO_SINGLE_ROOM} component={InformationSingleRoom} options={{ headerShown: false, }}/>
                <Stack.Screen name={ROUTING.ROUTING_SCAN_QR_CODE_SCREEN} component={ScanQrCodeScreen} options={{ headerShown: false, }}/>
                <Stack.Screen name={ROUTING.ROUTING_SCAN_QR_CODE_COMPLETE_SCREEN} component={ScanQrCodeCompleteScreen} options={{ headerShown: false, }}/>
                {/*<Stack.Screen name="AddMember" component={AddMember} options={{ headerShown: false, }}/>*/}
                {/*<Stack.Screen name="SeeMembers" component={SeeMembers} options={{ headerShown: false, }}/>*/}
                <Stack.Screen name={ROUTING.ROUTING_FRIEND_REQUEST} component={FriendRequestScreen} options={{ headerShown: false, }}/>
                <Stack.Screen name={ROUTING.ROUTING_PERSONAL_PAGE} component={PersonalPageScreen} options={{ headerShown: false, }}/>
                <Stack.Screen name={ROUTING.ROUTING_FIND_USER} component={FindUserScreen} options={{ headerShown: false, }}/>
                <Stack.Screen name={ROUTING.ROUTING_SHARE_MESSAGE_SCREEN} component={ShareMessageScreen} options={{ headerShown: false, }}/>
                {/*<Stack.Screen name="SettingUser" component={SettingUser} options={{ headerShown: false, }}/>*/}
                {/*<Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false, }}/>*/}
                <Stack.Screen name={ROUTING.ROUTING_CREATE_NEW_GROUP} component={CreateNewGroupScreen} options={{ headerShown: false, }}/>
                {/*<Stack.Screen name="SettingGroup" component={SettingGroup} options={{ headerShown: false, }}/>*/}
            </Stack.Navigator>

            {/*<MainApp/>*/}
        </NavigationContainer>
    )
}



const MyTab = () =>{
    return(
        <Tab.Navigator
            initialRouteName={ROUTING.ROUTING_HOME_CHAT}
            // activeColor={false}
            // labelStyle={{ fontSize: 12}}
            // barStyle={{
            //     backgroundColor: "#e8def8"
            // }}
        >
            <Tab.Screen
                name={ROUTING.ROUTING_HOME_CHAT}
                component={HomeChatScreen}
                options={{
                    headerShown:false,
                    title:"Message",
                    tabBarIcon: ({ color, size }:{color:string, size:number}) =>(
                        <FontAwesomeIcon icon={faMessage} color={color} size={size}/>
                    )
                }}


            />
            <Tab.Screen
                name={ROUTING.ROUTING_CONTACT}
                component={ContactScreen}
                options={{
                    headerShown:false,
                    title:"Contact",
                    tabBarIcon: ({ color, size }:{color:string, size:number}) =>(
                        <FontAwesomeIcon icon={faBook} color={color} size={size}/>
                    )
                }}

            />
            <Tab.Screen
                name={ROUTING.ROUTING_SETTING_USER}
                component={SettingUserScreen}
                options={{
                    headerShown:false,
                    title:"Setting",
                    tabBarIcon: ({ color, size }:{color:string, size:number}) =>(
                        <FontAwesomeIcon icon={faUser} color={color} size={size}/>
                    )
                }}

            />
        </Tab.Navigator>
    )
}


export {Navigation}
