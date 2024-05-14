import {LoginScreen} from "../screens/login-screen";
import {HomeChatScreen} from "../screens/home-chat-screen";
import {NavigationContainer} from "@react-navigation/native";
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import * as ROUTING from "./path.ts";
import {RoomChatScreen} from "../screens/room-chat-screen";
import {CallScreen} from "../screens/call-screen";
import {FlashScreen} from "../screens/flash-screen";

const Stack = createNativeStackNavigator();

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
                <Stack.Screen name={ROUTING.ROUTING_HOME_CHAT} component={HomeChatScreen} options={{headerShown: false,}}/>
                <Stack.Screen name={ROUTING.ROUTING_ROOM_CHAT} component={RoomChatScreen} options={{ headerShown: false, }}/>
                <Stack.Screen name={ROUTING.ROUTING_CALL} component={CallScreen} options={{ headerShown: false, }}/>
                {/*<Stack.Screen name="InformationSingleRoom" component={InformationSingleRoom} options={{ headerShown: false, }}/>*/}
                {/*<Stack.Screen name="InformationGroupRoom" component={InformationGroupRoom} options={{ headerShown: false, }}/>*/}
                {/*<Stack.Screen name="AddMember" component={AddMember} options={{ headerShown: false, }}/>*/}
                {/*<Stack.Screen name="SeeMembers" component={SeeMembers} options={{ headerShown: false, }}/>*/}
                {/*<Stack.Screen name="FriendRequest" component={FriendRequest} options={{ headerShown: false, }}/>*/}
                {/*<Stack.Screen name="PersonalPage" component={PersonalPage} options={{ headerShown: false, }}/>*/}
                {/*<Stack.Screen name="FindUser" component={FindUser} options={{ headerShown: false, }}/>*/}
                {/*<Stack.Screen name="SettingUser" component={SettingUser} options={{ headerShown: false, }}/>*/}
                {/*<Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false, }}/>*/}
                {/*<Stack.Screen name="CreateNewGroup" component={CreateNewGroup} options={{ headerShown: false, }}/>*/}
                {/*<Stack.Screen name="SettingGroup" component={SettingGroup} options={{ headerShown: false, }}/>*/}
            </Stack.Navigator>

            {/*<MainApp/>*/}
        </NavigationContainer>
    )
}

export {Navigation}
