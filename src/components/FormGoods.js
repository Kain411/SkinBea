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
    Alert,
    Dimensions,
} from 'react-native';

import { firebase } from '@react-native-firebase/firestore';

const wS = Dimensions.get('screen').width / 100;



const FormGoods = ({ item }) => {

    const handlePress = () => {
        firebase.firestore().collection('goods').doc(`${item._id}`).delete()
    };



    return (
        <View
            style={{
                flexDirection: 'row',
                marginTop: 20,
                backgroundColor: '#fff',
                alignItems: 'center',
                width: wS * 92,
                borderRadius: wS * 2,
                elevation: 2,
                shadowColor: '#ccc',
                borderWidth: 1,
                borderColor: '#ccc',
                paddingVertical: wS*4,
            }}
        >
            <Image
                source={{ uri: item.uri }}
                style={{
                    width: 130,
                    height: 120,
                    marginHorizontal: 5,
                    objectFit: 'contain'
                }}
            />
            <View
                style={{
                    flex: 1,
                    marginHorizontal: 5,
                }}
            >
                <Text
                    style={{
                        color: '#000',
                        marginVertical: 10,

                    }}
                > {item.description.length > 80 ? `${item.description.substring(0, 80)}...` : item.description}</Text>
                <Text
                    style={{
                        color: '#ff5151',
                    }}
                >{item.price - (item.price * item.discount / 100)}$</Text>
            </View>

            <TouchableOpacity
                style={[styles.delete, styles.center]}
                onPress={handlePress}
            >
                <Image
                    style={styles.iconTrash}
                    source={require("../img/iconTrash.png")}
                />
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    delete: {
        width: wS * 15,
        height: wS * 8,
        backgroundColor: 'red',
        position: 'absolute',
        right: 0,
        bottom: 0,
        borderTopLeftRadius: wS * 2,
    },
    iconTrash: {
        width: wS * 4,
        height: wS * 4,
        tintColor: '#ffffff',
    },
})

export default FormGoods;