import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Text, TouchableOpacity, View} from "react-native";
import {RNCamera} from "react-native-camera";
import {ROUTING_SCAN_QR_CODE_COMPLETE_SCREEN} from "../../navigation/path.ts";

const ScanQrCodeScreen = ({ navigation }: any) => {
    const onSuccess = (e: any) => {
        const token = e.data;
        console.log('qrCode: ' ,token);
        navigation.navigate(ROUTING_SCAN_QR_CODE_COMPLETE_SCREEN, { token });
    };

    return (
        <View>
            <QRCodeScanner
                onRead={onSuccess}
                cameraProps={{
                    flashMode: RNCamera.Constants.FlashMode.off
                }}
                bottomContent={
                    <TouchableOpacity>
                        <Text>OK. Got it!</Text>
                    </TouchableOpacity>
                }
            />
        </View>
    )
}

export { ScanQrCodeScreen }
