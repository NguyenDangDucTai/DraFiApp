import {Image, View} from "react-native";
import {Button} from "../button";

const EmojisMessage = ({onClick}: { onClick?: any }) => {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 200,
            backgroundColor: 'white',
            gap: 20,
            marginHorizontal: 20,
        }}>
            <Button
                icon={{uri: 'https://cdn.iconscout.com/icon/free/png-512/free-heart-suit-card-37956.png?f=webp&w=256'}}
                iconStyle={{width: 30, height: 30}}
                iconPosition='left'
                onClick={() => onClick && onClick('heart')}
            />
            <Button
                icon={{uri: 'https://cdn.iconscout.com/icon/free/png-512/free-haha-2387660-1991060.png?f=webp&w=256'}}
                iconStyle={{width: 30, height: 30}}
                iconPosition='left'
                onClick={() => onClick && onClick('heart')}
            />
            <Button
                icon={{uri: 'https://cdn.iconscout.com/icon/free/png-256/free-wow-2387663-1991062.png'}}
                iconStyle={{width: 30, height: 30}}
                iconPosition='left'
                onClick={() => onClick && onClick('wow')}
            />
            <Button
                icon={{uri: 'https://cdn.iconscout.com/icon/free/png-512/free-cry-face-sad-sob-tear-emoji-37716.png?f=webp&w=256'}}
                iconStyle={{width: 30, height: 30}}
                iconPosition='left'
                onClick={() => onClick && onClick('cry')}
            />
            <Button
                icon={{uri: 'https://cdn.iconscout.com/icon/free/png-512/free-angry-face-14-894765.png?f=webp&w=256'}}
                iconStyle={{width: 30, height: 30}}
                iconPosition='left'
                onClick={() => onClick && onClick('angry')}
            />
        </View>
    )
}

export {EmojisMessage}
