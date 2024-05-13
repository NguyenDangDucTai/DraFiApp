import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {StyleProp, TouchableOpacity, View, ViewStyle} from "react-native";

interface FontAwesomeButtonProps {
    style?:  StyleProp<ViewStyle>;
    onClick?: any;
    onLongClick?: any;
    icon: any;
    iconStyle?: any;
}

const FontAwesomeButton = ({ style, onClick, onLongClick, icon, iconStyle }: FontAwesomeButtonProps) => {
    return (
        <TouchableOpacity
            style={style || { paddingHorizontal: 12, paddingVertical: 5 }}
            onPress={onClick}
            onLongPress={onLongClick}
            // delayLongPress={1000}
        >
            <FontAwesomeIcon {...icon} />
        </TouchableOpacity>
    )
}

export { FontAwesomeButton }
