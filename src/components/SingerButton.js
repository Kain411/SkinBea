import React, { useEffect, useState, useRef } from 'react';
import {
    ScrollView,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const SingerButton = (navigation) => {
    return (

        <View
            style={{
                backgroundColor: '#C1FFFB',
                paddingVertical: 10,
                marginEnd: 20,
                borderRadius: 4,
                marginBottom: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Text
                style={{
                    color: '#000',
                    marginStart: 40,
                    fontStyle: 'italic',
                    fontWeight: '400',

                }}
            >{navigation.name}</Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    position: 'relative',
                }}
            >
                {/* <Image source={require('../img/box.png')} /> */}
                <TouchableOpacity
                    style={{
                        marginEnd: 20,
                    }}
                    onPress={navigation.onPress}>
                    {navigation.check == true && <Image
                        style={{
                            width: 24, 
                            height: 24, 
                        }}
                        source={require('../img/boxchecked.png')} />}
                    {navigation.check == false && <Image
                        style={{
                            width: 24, 
                            height: 24, 
                        }}
                        source={require('../img/box.png')} />}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SingerButton;