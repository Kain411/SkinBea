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
    Dimensions
} from 'react-native';
import SingerButton from '../components/SingerButton';
import { useNavigation } from '@react-navigation/native';
import { db } from '../config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { firebase } from '@react-native-firebase/firestore';

const wS = Dimensions.get('screen').width / 100;

const Product = ({ item }) => {
    return (
        <View style={styles.formProduct}>
            <Image
                source={{ uri: `${item.uri}` }}
                style={styles.imgProduct}
            />
            <View style={styles.infoProduct}>
                <Text style={styles.txtInfo}>
                    {item.description}</Text>
                <Text style={{ color: '#ff5151' }}> {item.price - item.price * item.discount / 100}$ </Text>
            </View>
        </View>
    )
}


const Payment = ({ route }) => {

    const key = route.params;
    console.log("Payment:", key);

    const navigation = useNavigation();

    const [user, setUser] = useState({});

    useEffect(() => {
        const res = collection(db, 'user')
        onSnapshot(res, (snapshot) => {
            snapshot.docs.map((doc) => {
                if (doc.data()._id == key) {
                    setUser(doc.data())
                }
            })
        })
    }, [])

    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState();

    useEffect(() => {
        const res = collection(db, 'goods')

        onSnapshot(res, (snapshot) => {
            let lst = [];
            let sum = 0;
            snapshot.docs.map((doc) => {
                if (doc.data().userId === key) {
                    lst.push(doc.data());
                    const i = doc.data();
                    console.log("Price", i.price);
                    sum += (i.price - i.price * i.discount / 100);
                }
            })
            setTotal(sum);
            setProducts(lst);
        })
    }, [])

    const handleExit = () => {
        Alert.alert(
            'Xác nhận thoát',
            'Bạn có muốn thoát không?',
            [
                {
                    text: 'Không',
                    onPress: () => console.log('Không thoát'),
                    style: 'cancel',
                },
                {
                    text: 'Có',
                    onPress: () => {
                        navigation.goBack()
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const [click, setClick] = useState([
        {
            name: "Thẻ ngân hàng",
            check: true,
        },
        {
            name: "Thanh toán khi nhận hàng",
            check: false,
        }
    ])

    const removeProduct = () => {
        products.map((item) => {
            console.log(item._id)
            firebase.firestore().collection('goods').doc(`${item._id}`).delete()
        })
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
                    position: 'relative',
                    top: 0,
                    left: 0,
                    height: 80,
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
                        style={styles.title}
                    >Payment</Text>
                </View>
                <TouchableOpacity
                    onPress={handleExit}
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
            <View
                style={{
                    flex: 82,
                    flexDirection: 'row'
                }}
            >
                <ScrollView>
                    <View style={styles.form}>
                        <Text style={styles.title}>Address:</Text>
                        <Text
                            style={{ color: '#000', fontSize: 16, }}
                        >{user.name}</Text>
                        <Text style={{ color: '#000', fontSize: 16, }}>Phone: {user.phone}</Text>
                        <Text style={{ color: '#000', fontSize: 16, }}>{user.address}</Text>
                        <TouchableOpacity onPress={() => {

                        }}>
                            <Text style={{ color: '#ccc', fontSize: 14, marginTop: 10, fontWeight: '400', }}>Change your address</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.title}>Product</Text>
                        {products.map((item) => {
                            return <Product item={item} key={item._id} />
                        })}
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.title}>Total</Text>
                        <View style={[styles.flexBox, styles.money]}>
                            <Text style={styles.payment}>Total Amount:</Text>
                            <Text style={styles.payment}>{total}$</Text>
                        </View>
                        <View style={[styles.flexBox, styles.money]}>
                            <Text style={styles.payment}>Transport fee:</Text>
                            <Text style={styles.payment}>5%</Text>
                        </View>
                        <View style={[styles.flexBox, styles.money]}>
                            <Text style={{ ...styles.payment, color: 'red' }}>Total:</Text>
                            <Text style={{ ...styles.payment, color: 'red' }}> {total + 5 * total / 100}$</Text>
                        </View>
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.title}>Payment Methods:</Text>
                        {click.map(each =>
                            <SingerButton
                                onPress={() => {
                                    let newBut = click.map(x => {
                                        return {
                                            ...x,
                                            check: x.name == each.name,
                                        }
                                    })
                                    setClick(newBut);
                                }}
                                name={each.name}
                                check={each.check}
                            />)
                        }

                    </View>
                </ScrollView>
            </View>
            <View
                style={{
                    flex: 10,
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                }}
            >
                <View
                    style={{
                        flex: 1,
                        // flexDirection: 'row',
                        alignItems: 'center',
                        // justifyContent:'flex-start',
                    }}
                >
                    <Text
                        style={{
                            flex: 1,
                            color: '#ff5151',
                            fontSize: 25,
                            marginStart: 10,
                            fontWeight: 'bold',
                            // justifyContent: 'center',
                        }}
                    >Total:</Text>
                    <Text
                        style={{
                            flex: 1,
                            fontSize: 20,
                            color: '#ff5151',
                        }}
                    >{total + 5 * total / 100}$</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        removeProduct();
                        navigation.navigate("Payment_Success", {
                            key,
                            products
                        })
                    }}
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
                    >Thanh toán</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    formProduct: {
        flexDirection: 'row',
        height: wS * 30,
        backgroundColor: '#fff',
        alignItems: 'center',
        elevation: 1,
        marginBottom: wS * 5,
        borderRadius: wS * 2,
    },
    imgProduct: {
        width: wS * 30,
        height: wS * 30,
        paddingHorizontal: wS * 5,
        objectFit: 'contain'
    },
    infoProduct: {
        flex: 1,
        marginHorizontal: 5,
    },
    txtInfo: {
        color: '#000',
        marginEnd: 20,
        marginVertical: 10,
    },
    flexBox: {
        display: 'flex',
        flexDirection: 'row',
    },
    money: {
        justifyContent: 'space-between',
        paddingHorizontal: wS * 4,
        marginTop: wS,
    },
    payment: {
        fontSize: 15,
    },
    form: {
        backgroundColor: '#fff',
        marginTop: wS * 5,
        elevation: 1,
        paddingVertical: wS * 3,
        paddingHorizontal: wS * 5,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: wS * 2,
    }
})

export default Payment;