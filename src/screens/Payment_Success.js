import { useNavigation } from '@react-navigation/native';
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
import firestore from '@react-native-firebase/firestore'
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

const Payment_Success = ({ route }) => {

    const {key, products} = route.params;

    // console.log(products)
    const navigation = useNavigation();

    const addProduct = async (item) => {
        const doc = await firestore().collection('bought').doc(item._id)
        doc.set({
            _id: item._id,
            brandId: item.brandId,
            description: item.description,
            discount: item.discount,
            name: item.name,
            price: item.price,
            type: item.type,
            uri: item.uri,
            userId: key
        })
    }

    useEffect(() => {
        products.map((item) => {
            addProduct(item)
        })
    }, [])

    return (
        <SafeAreaView
            style={{
                flex: 100,
                backgroundColor: '#f4f8f4',
            }}
        >
            <View
                style={{
                    // flex: 8,
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'relative',
                    top: 0,
                    left: 0,
                    height: 60,
                    elevation: 5,
                    backgroundColor: '#ffffff',
                }}
            >
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                }}>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 28,
                        }}
                    >Payment</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        width: 80,
                        height: 80,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: -10,
                        left: -10,
                    }}
                >
                    <Image
                        style={{
                            // backgroundColor: '#ccc',
                            // flex: 1,
                            width: 30,
                            height: 30,
                            objectFit: 'cover'
                            // marginHorizontal: 13,

                        }}
                        source={
                            require('../img/left2.png')
                        }
                    />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    // flex: 82,
                    // backgroundColor: '#fff',
                    flexDirection: 'row'
                }}
            >
                <View
                    style={{
                        backgroundColor: '#fff',
                        flex: 1,
                        flexDirection: 'row',
                        marginTop: 30,
                        padding: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Image
                        style={{
                            maxWidth: 30,
                            maxHeight: 30,
                            marginEnd: 10,
                            borderRadius: 50,
                        }}
                        source={require('../img/check.png')} />
                    <Text
                        style={{
                            color: '#ff5151',
                            fontSize: 23,
                        }}
                    >You have successfully paid</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Payment_Success;