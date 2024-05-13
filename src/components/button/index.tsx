import {Image, Text, TouchableOpacity} from "react-native";

interface ButtonProps {
    style?: any;
    textStyle?: any;
    onClick?: any;
    text?: string;
    icon?: any;
    iconPosition?: 'left' | 'right';
    iconStyle?: any;
}

const Button = ({ style, textStyle, onClick, text, icon, iconPosition, iconStyle }: ButtonProps) => {
    return (
        <TouchableOpacity
            style={style}
            onPress={onClick}
        >
            {icon && iconPosition === 'left' && <Image source={icon} style={iconStyle} />}
            {text && <Text style={textStyle}>{text}</Text>}
            {icon && iconPosition === 'right' && <Image source={icon} style={iconStyle} />}
        </TouchableOpacity>
    )
}

export { Button }
