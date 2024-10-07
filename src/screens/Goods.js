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
    FlatList,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import FormGoods from '../components/FormGoods';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';

const Goods = ({ route }) => {

    const [product, setProduct] = useState([])
    const [total, setTotal] = useState();
    const key = route.params;
    console.log("Goods", key)

    const navigation = useNavigation();

    useEffect(() => {
        const res = collection(db, 'goods')

        onSnapshot(res, (snapshot) => {
            let lst = []
            snapshot.docs.map((doc) => {
                if (doc.data().userId === key) lst.push(doc.data())
            })
            setProduct(lst);
        })
    }, [])

    const result =  () => {
        let sum = 0;
        product.map((i) => {
            sum += (i.price - i.price*i.discount/100)
        })
        return sum;
    }

    return (
        <SafeAreaView
            style={{
                flex: 100,
                backgroundColor: '#f4f8f4',
            }}
        >
            <View
                style={{
                    flex: 8,
                    display: 'flex',
                    flexDirection: 'row',
                    height: 80,
                    backgroundColor: '#ffffff',
                    elevation: 5,
                }}
            >
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    flexDirection: 'row',
                }}>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 28,
                            marginRight: 10,
                        }}
                    >Cart</Text>
                    <Text
                        style={{
                            color: 'red',
                            fontSize: 15,
                        }}
                    >({product.length})</Text>
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
                            width: 30,
                            height: 30,
                            objectFit: 'cover'
                        }}
                        source={
                            require('../img/left2.png')
                        }
                    />
                </TouchableOpacity>
            </View>
            <View style={{
                flex: 82,
                alignItems: 'center'
            }}>
                {product.map((item) => {
                    return <FormGoods item={item} />
                })}
            </View>
            <View
                style={{
                    flex: 10,
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    zIndex: 1,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            flex: 1,
                            color: '#ff5151',
                            fontSize: 25,
                            marginStart: 10,
                            fontWeight: 'bold',
                        }}
                    >Total:</Text>
                    <Text
                        style={{
                            flex: 1,
                            fontSize: 20,
                            color: '#ff5151',
                        }}
                    >
                        {result()}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Payment", key)
                    }
                    style={{
                        backgroundColor: '#FF5151',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 20,
                        }}
                    >Buy now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Goods;