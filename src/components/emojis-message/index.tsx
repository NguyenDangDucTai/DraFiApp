import {Image, View} from "react-native";
import {Button} from "../button";
import {useState} from "react";

const EmojisMessage = ({onClick, reactionSelect}: { onClick?: any, reactionSelect?: any }) => {

    let reactionType = reactionSelect?.type;

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
            <View
                style={reactionType === "heart" && {backgroundColor: '#BBBBBB', padding:3, borderRadius: 10}}
            >
                <Button
                    icon={{uri: 'https://cdn.iconscout.com/icon/free/png-512/free-heart-suit-card-37956.png?f=webp&w=256'}}
                    iconStyle={{width: 30, height: 30}}
                    iconPosition='left'
                    onClick={() => onClick && onClick('heart')}
                />
            </View>
            <View
                style={reactionType === "smile" && {backgroundColor: '#BBBBBB', padding:3, borderRadius: 10}}
            >
                <Button
                    icon={{uri: 'https://cdn.iconscout.com/icon/free/png-512/free-haha-2387660-1991060.png?f=webp&w=256'}}
                    iconStyle={{width: 30, height: 30}}
                    iconPosition='left'
                    onClick={() => onClick && onClick('smile')}
                />
            </View>
            <View
                style={reactionType === "supprise" && {backgroundColor: '#BBBBBB', padding:3, borderRadius: 10}}
            >
                <Button
                    icon={{uri: 'https://cdn.iconscout.com/icon/free/png-256/free-wow-2387663-1991062.png'}}
                    iconStyle={{width: 30, height: 30}}
                    iconPosition='left'
                    onClick={() => onClick && onClick('supprise')}
                />
            </View>
            <View
                style={reactionType === "sad" && {backgroundColor: '#BBBBBB', padding:3, borderRadius: 10}}
            >
                <Button
                    icon={{uri: 'https://cdn.iconscout.com/icon/free/png-512/free-cry-face-sad-sob-tear-emoji-37716.png?f=webp&w=256'}}
                    iconStyle={{width: 30, height: 30}}
                    iconPosition='left'
                    onClick={() => onClick && onClick('sad')}
                />
            </View>
            <View
                style={reactionType === "angry" && {backgroundColor: '#BBBBBB', padding:3, borderRadius: 10}}
            >
                <Button
                    icon={{uri: 'https://cdn.iconscout.com/icon/free/png-512/free-angry-face-14-894765.png?f=webp&w=256'}}
                    iconStyle={{width: 30, height: 30}}
                    iconPosition='left'
                    onClick={() => onClick && onClick('angry')}
                />
            </View>
            <View
                style={reactionType === "like" && {backgroundColor: '#BBBBBB', padding:3}}
            >
                <Button
                    icon={{uri: 'https://banner2.cleanpng.com/20180521/qsa/kisspng-like-button-facebook-inc-social-media-youtube-cut-and-craft-artisan-bistro-5b02dc278c90a3.3259430015269140875758.jpg'}}
                    iconStyle={{width: 30, height: 30, }}
                    iconPosition='left'
                    onClick={() => onClick && onClick('like')}
                />
            </View>
        </View>
    )
}

export {EmojisMessage}
