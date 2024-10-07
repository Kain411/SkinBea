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

const UIButton = (navigation) => {
    return (
        <TouchableOpacity
            style={{
                width: 25,
                height: 25,
                borderColor: '#bf6464',
                borderWidth: 1,
                marginEnd: 15,
            }}
            onPress={navigation.onPress}>
            {navigation.isSelected == true && <Image source={require('../img/tick.png')} />}
        </TouchableOpacity>
    )
}

export default UIButton;