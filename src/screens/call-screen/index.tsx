import {StyleSheet, View, Image} from 'react-native';
import ZegoUIKitPrebuiltCallService, {
    ZegoUIKitPrebuiltCall,
    ONE_ON_ONE_VIDEO_CALL_CONFIG,
    ONE_ON_ONE_VOICE_CALL_CONFIG,
    ZegoMenuBarButtonName,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {KeyCenter} from "../../constants/KeyCenter";
import {useRef} from "react";
import {ROUTING_CALL, ROUTING_ROOM_CHAT} from "../../navigation/path.ts";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
    },
});

const CallScreen = (props: any) => {
    const prebuiltRef = useRef();
    const {route} = props;
    const {params} = route;
    const {chatId, userId, userName, avatar, roomName, roomType, type} = params;

    const callConfigWithType = type === 'VIDEO' ? ONE_ON_ONE_VIDEO_CALL_CONFIG : ONE_ON_ONE_VOICE_CALL_CONFIG;

    return (
        <View style={styles.container}>
            <ZegoUIKitPrebuiltCall
                ref={prebuiltRef}
                appID={KeyCenter.appID}
                appSign={KeyCenter.appSign}
                userID={chatId}
                userName={userName}
                callID={chatId}

                config={{
                    // ...ONE_ON_ONE_VOICE_CALL_CONFIG,
                    // ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                    ...callConfigWithType,

                    avatarBuilder: ({userInfo}: {userInfo: any}) => {
                        return <View style={{width: '100%', height: '100%'}}>
                            <Image
                                style={{width: '100%', height: '100%'}}
                                resizeMode="cover"
                                source={{uri: avatar}}
                            />
                        </View>
                    },
                    onHangUp: () => {
                        props.navigation.navigate(ROUTING_ROOM_CHAT, { chatId: chatId });
                    },
                    timingConfig: {
                        isDurationVisible: true,
                        onDurationUpdate: (duration: any) => {
                            if (duration === 10 * 60) {
                                ZegoUIKitPrebuiltCallService.hangUp();
                            }
                        }
                    },
                    topMenuBarConfig: {
                        buttons: [
                            ZegoMenuBarButtonName.minimizingButton,
                        ],
                    },
                    onWindowMinimized: () => {
                        props.navigation.navigate(ROUTING_ROOM_CHAT, { chatId: chatId });
                    },
                    onWindowMaximized: () => {
                        props.navigation.navigate(ROUTING_CALL, {
                            chatId, userId, userName, avatar, roomName, roomType, type
                        });
                    },
                }}
            />
        </View>
    );
}

export {CallScreen}
