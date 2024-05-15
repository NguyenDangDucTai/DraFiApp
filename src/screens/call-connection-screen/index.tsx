import {Image, Text, View} from "react-native";
import {FontAwesomeButton} from "../../components/fontawesome-button";
import {faPhone} from "@fortawesome/free-solid-svg-icons/faPhone";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {useEffect, useRef, useState} from "react";

interface CallConnectionScreenProps {
    avatar: string;
    displayName: string;
    isSender: boolean;
    status: string;
    onAccept?: any;
    onReject?: any;
    onCancel?: any;
}

const CallConnectionScreen = ({ route }: any) => {
    const props: CallConnectionScreenProps = route.params;
    const [timeout, setTimeout] = useState(5);
    const interval = useRef<any>(null);

    useEffect(() => {
        if(props.isSender) {
            interval.current = setInterval(() => {
                setTimeout(pre => pre - 1);
            }, 1000);
        }

        return () => {
            clearInterval(interval.current);
        }
    }, []);

    // useEffect(() => {
    //     if(timeout <= 0) {
    //         props.onCancel();
    //     }
    // }, [timeout]);

    return (
        <View style={{
            backgroundColor: '#00a8ff'
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: '70%',
            }}>
                <View>
                    <Image
                        source={props?.avatar ? {uri: props?.avatar} : require('../../assets/doraemon.png')}
                        style={{width: 200, height: 200, borderRadius: 1000}}
                    />
                    <Text style={{
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: 700,
                        fontSize: 23,
                        marginTop: 20
                    }}>
                        {props?.displayName}
                    </Text>
                    <Text style={{
                        color: '#dcdde1',
                        textAlign: 'center',
                        fontSize: 16,
                        marginTop: 5,
                        fontWeight: 500,
                    }}>
                        {props?.status}
                    </Text>
                    {props?.isSender === false && (
                        <Text style={{ textAlign: 'center' }}>
                            {timeout}
                        </Text>
                    )}
                </View>
            </View>
            <View style={{
                height: '30%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>
                <FontAwesomeButton
                    style={{
                        backgroundColor: 'red',
                        borderRadius: 1000,
                        padding: 15,
                    }}
                    icon={{icon: faXmark, color: 'white', size: 30}}
                    onClick={props?.isSender ? props?.onCancel : props?.onReject}
                />
                {!props?.isSender && (
                    <FontAwesomeButton
                        style={{
                            backgroundColor: 'green',
                            borderRadius: 1000,
                            padding: 15,
                            flexDirection: 'row'
                        }}
                        icon={{icon: faPhone, color: 'white', size: 30}}
                        onClick={props?.onAccept}
                    />
                )}
            </View>
        </View>
    );
}

export {CallConnectionScreen}
