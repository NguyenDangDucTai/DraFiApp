import {Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { faSquare } from '@fortawesome/free-regular-svg-icons/faSquare';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck';

interface CheckBoxProps {
    style?: any;
    value?: boolean,
    label?: string,
    labelStyle?: any,
    iconStyle?: any,
    onChange?: any
}

const CheckBox = ({ style, value = false, iconStyle, label, labelStyle, onChange }: CheckBoxProps) => {
    const handleClick = () => onChange && onChange(!value);

    return (
        <View style={style}>
            <TouchableOpacity onPress={handleClick}>
                {value ? (
                    <FontAwesomeIcon
                        icon={faSquareCheck}
                        style={iconStyle || { width: 30, height: 30 }}
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={faSquare}
                        style={iconStyle || { width: 30, height: 30 }}
                    />
                )}
            </TouchableOpacity>

            {label && (
                <TouchableOpacity onPress={handleClick}>
                    <Text style={labelStyle}>{label}</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export { CheckBox }
