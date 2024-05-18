import {Image, Text, View} from "react-native";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useScanLoginQr} from "../../api/useScanLoginQr.ts";
import {Button} from "../../components/button";
import moment from "moment-timezone";
import {useConfirmLoginQr} from "../../api/useConfirmLoginQr.ts";
import {useRejectLoginQr} from "../../api/useRejectLoginQr.ts";

const ScanQrCodeCompleteScreen = ({ route, navigation }: any) => {
    const { token } = route.params;
    const user = useSelector((state: any) => state.userData);
    const userId = user.id;

    const {
        mutate: scanLoginQr,
        data: scanLoginQrData
    } = useScanLoginQr();
    const loginQrRequest = scanLoginQrData?.data;
    const loginQrRequestInfo = loginQrRequest?.requestInfo;
    const loginQrRequestLocation = loginQrRequestInfo?.location ? JSON.parse(loginQrRequestInfo?.location) : null;
    const loginQrRequestCreatedAt = loginQrRequest?.createdAt?.seconds;

    const {
        mutate: confirmLoginQr,
        isSuccess: confirmLoginQrSuccess,
    } = useConfirmLoginQr();
    const {
        mutate: rejectLoginQr,
        isSuccess: rejectLoginQrSuccess
    } = useRejectLoginQr();

    const handleBtnConfirmClick = () => {
        console.log('confirm login qr');
        confirmLoginQr(token);
    }

    const handleBtnRejectClick = () => {
        console.log('reject login qr')
        rejectLoginQr(token);
    }

    useEffect(() => {
        scanLoginQr({ uid: userId, token });
    }, []);

    useEffect(() => {
        if(confirmLoginQrSuccess || rejectLoginQrSuccess) {
            navigation.goBack();
        }
    }, [confirmLoginQrSuccess, rejectLoginQrSuccess]);

    return (
        <View style={{
            paddingHorizontal: 25,
            backgroundColor: 'white',
            flexDirection: 'column',
            flex: 1
        }}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 20,
                }}>
                    <Image
                        source={require('../../assets/icon-scan-pc-qr.jpg')}
                        style={{
                            width: 130,
                            height: 100,
                        }}
                    />
                </View>

                <Text style={{
                    color: '#2c3e50',
                    fontWeight: 'bold',
                    fontSize: 20,
                    textAlign: 'center',
                    marginBottom: 30,
                }}>
                    Đăng nhập DraFi bằng mã QR
                </Text>

                <View>
                    <View style={{
                        flexDirection: 'row',
                        marginBottom: 7,
                    }}>
                        <Text style={{
                            color: '#778ca3',
                            fontWeight: 400,
                            fontSize: 15,
                            flex: 0.3
                        }}>
                            Thiết bị
                        </Text>
                        <Text style={{
                            color: '#2c3e50',
                            fontWeight: 500,
                            fontSize: 15,
                            flex: 0.7
                        }}>
                            {(loginQrRequestInfo?.browser && ' - ' && loginQrRequestInfo?.os) || 'Loading...'}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginBottom: 7
                    }}>
                        <Text style={{
                            color: '#778ca3',
                            fontWeight: 400,
                            fontSize: 15,
                            flex: 0.3
                        }}>
                            Thời gian
                        </Text>
                        <Text style={{
                            color: '#2c3e50',
                            fontWeight: 500,
                            fontSize: 15,
                            flex: 0.7
                        }}>
                            {loginQrRequestCreatedAt ? moment(loginQrRequestCreatedAt * 1000).format('HH:mm - DD/MM/yyyy') : 'Loading...'}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginBottom: 7
                    }}>
                        <Text style={{
                            color: '#778ca3',
                            fontWeight: 400,
                            fontSize: 15,
                            flex: 0.3
                        }}>
                            Địa điểm
                        </Text>
                        <Text style={{
                            color: '#2c3e50',
                            fontWeight: 500,
                            fontSize: 15,
                            flex: 0.7
                        }}>
                            {(loginQrRequestLocation?.city && ' - ' && loginQrRequestLocation?.country_name) || 'Loading...'}
                        </Text>
                    </View>
                </View>

                <Text style={{
                    color: '#2c3e50',
                    fontWeight: 400,
                    fontSize: 15,
                    marginBottom: 20,
                    marginTop: 10,
                }}>
                    Để bảo vệ tài khoản của bạn, vui lòng chỉ xác nhận khi bạn tin tưởng thiết bị này
                </Text>
            </View>

            <View style={{
                paddingVertical: 30,
            }}>
                <Button
                    text="Xác nhận Đăng nhập"
                    onClick={handleBtnConfirmClick}
                    textStyle={{
                        color: 'white',
                        backgroundColor: 'dodgerblue',
                        fontWeight: 500,
                        fontSize: 15,
                        paddingHorizontal: 20,
                        paddingVertical: 9,
                        borderRadius: 500,
                        marginBottom: 10,
                        textAlign: 'center'
                    }}
                />
                <Button
                    text="Từ chối Đăng nhập"
                    onClick={handleBtnRejectClick}
                    textStyle={{
                        color: '#60646a',
                        fontWeight: 500,
                        fontSize: 15,
                        paddingHorizontal: 20,
                        paddingVertical: 9,
                        borderRadius: 500,
                        backgroundColor: '#dfe4ea',
                        textAlign: 'center'
                    }}
                />
            </View>
        </View>
    )
}

export default ScanQrCodeCompleteScreen;
