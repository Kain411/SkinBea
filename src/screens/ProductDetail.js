import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import CheckBox from 'react-native-check-box';
import Voucher from '../components/Voucher';
import firestore from '@react-native-firebase/firestore'

const wS = Dimensions.get("screen").width / 100;

const ProductDetail = ({ route }) => {

    const {item, userId} = route.params
    const navigation = useNavigation();

    console.log(userId)

    const [check, setCheck] = useState(true)

    const addProduct = async () => {
        const doc = await firestore().collection('goods').doc(item._id)
        doc.set({
            _id: item._id,
            brandId: item.brandId,
            description: item.description,
            discount: item.discount,
            name: item.name,
            price: item.price,
            type: item.type,
            uri: item.uri,
            userId: userId
        })
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: .92 }}>
                <ImageBackground
                    resizeMode="contain"
                    source={{ uri: `${item.uri}` }}
                    style={styles.product}
                >
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigation.navigate('MyTab', userId)}
                    >
                        <Image
                            source={require("../img/left2.png")}
                            style={styles.callback}
                        />
                    </TouchableOpacity>
                </ImageBackground>

                <View style={styles.infoProduct}>
                    <View style={styles.flexBox}>
                        <Text style={[styles.money, styles.price]}>{item.price - (item.price * item.discount / 100)}$</Text>
                        <Text style={[styles.money, styles.cost]}>{item.price}$</Text>
                        <Text style={[styles.money, styles.discount]}>-{item.discount}%</Text>
                    </View>
                    <Text style={styles.desProduct}>
                        {item.description}
                    </Text>
                </View>

                <View style={styles.componet}>
                    <Text style={styles.textFrame}>Voucher: </Text>
                    <Voucher />
                    <Voucher />
                    <Voucher />
                </View>

                <View style={styles.componet}>
                    <Text style={styles.textFrame}>Payment: </Text>
                    <View
                        style={{
                            ...styles.frame,
                            ...styles.flexBox,
                            justifyContent: 'space-between',
                            backgroundColor: '#C1FFFB'
                        }}
                    >
                        <View style={styles.flexBox}>
                            <Image
                                style={{ marginRight: wS * 2 }}
                                source={require('../img/cash.png')}
                            />
                            <Text style={{ ...styles.textFrame, fontSize: 16 }}>Cash</Text>
                        </View>
                        <CheckBox
                            checkBoxColor='#5AE4DC'
                            checkedCheckBoxColor='#5AE4DC'
                            onClick={() => setCheck(!check)}
                            isChecked={check}
                            style={styles.checkBox}
                        />
                    </View>
                    <View
                        style={{
                            ...styles.frame,
                            ...styles.flexBox,
                            justifyContent: 'space-between',
                            backgroundColor: '#C1FFFB'
                        }}
                    >
                        <View style={styles.flexBox}>
                            <Image
                                style={{ marginRight: wS * 2 }}
                                source={require('../img/cash.png')}
                            />
                            <Text style={{ ...styles.textFrame, fontSize: 16 }}>Transfer</Text>
                        </View>
                        <CheckBox
                            checkBoxColor='#5AE4DC'
                            checkedCheckBoxColor='#5AE4DC'
                            onClick={() => setCheck(!check)}
                            isChecked={!check}
                            style={styles.checkBox}
                        />
                    </View>
                </View>

                <View style={styles.componet}>
                    <Text style={styles.textFrame}>Evaluate: </Text>
                </View>


            </ScrollView>

            <View style={{...styles.flexBox, ...styles.addOrBuy, flex: .08, backgroundColor: 'aqua'}}>
                <TouchableOpacity 
                    style={[styles.btnClick, styles.add]}
                    onPress={addProduct}
                >
                    <Image
                        style={styles.iconAdd}
                        source={require('../img/basket.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.btnClick, styles.buy]}
                    onPress={() => {
                        addProduct();
                        navigation.navigate("Payment", userId);
                    }}
                >
                    <Text style={{ fontSize: 18, color: '#ffffff' }}>Buy Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    product: {
        width: wS * 100,
        height: wS * 60,
        shadowColor: '#000000',
        elevation: 1,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#E6E1E1',
    },
    callback: {
        width: wS * 5,
        height: wS * 5,

    },
    btn: {
        width: wS * 10,
        height: wS * 10,
        marginTop: wS * 2,
        marginLeft: wS * 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wS * 6,
        backgroundColor: '#ccc'
    },
    infoProduct: {
        marginVertical: wS * 4,
        justifyContent: 'center',
        paddingHorizontal: wS * 4,
    },
    flexBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    money: {
        verticalAlign: 'middle',
        textAlign: 'center',
        justifyContent: 'center',
        marginRight: wS * 4,
        color: 'red'
    },
    price: {
        fontSize: wS * 7,
    },
    cost: {
        textDecorationLine: 'line-through',
        color: '#B3B3B3',
        fontSize: wS * 5
    },
    discount: {
        backgroundColor: 'yellow',
        width: wS * 10,
        height: wS * 6,
        borderRadius: wS,
        fontSize: wS * 3,
    },
    desProduct: {
        marginTop: wS * 2,
        fontSize: 16,
        textAlign: 'justify',
        color: '#2A2525',
    },
    componet: {
        marginHorizontal: wS * 4,
        marginBottom: wS * 4,
        borderTopWidth: 1,
        borderColor: '#ccc',
        paddingTop: wS * 2,
    },
    frame: {
        marginTop: wS * 2,
        height: wS * 12,
        paddingHorizontal: wS * 4,
        borderRadius: wS * 2,
    },
    textFrame: {
        fontSize: 20,
        color: '#000000',
        fontStyle: 'italic',
    },
    btnFrame: {
        backgroundColor: '#FF5151',
        width: wS * 12,
        height: wS * 7,
        borderRadius: wS,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkBox: {
        marginRight: wS * 2
    },
    addOrBuy: {
        position: 'relative',

    },
    btnClick: {
        flex: .5,
        height: wS*15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    add: {
        backgroundColor: '#ffffff',
    },
    buy: {
        backgroundColor: '#E56969',
    },
    iconAdd: {
        width: wS * 8,
        height: wS * 8,
        objectFit: 'contain',
    }
})

export default ProductDetail;