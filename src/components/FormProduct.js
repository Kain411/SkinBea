import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, Dimensions, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import firestore from '@react-native-firebase/firestore'
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

const wS = Dimensions.get('screen').width / 100;

const FormProduct = ({ item, userId }) => {

    // console.log(userId);

    const maxLength = 20;

    const navigation = useNavigation();

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

    const [user, setUser] = useState({})
    useEffect(() => {
        const res = collection(db, 'user')
        onSnapshot(res, (snapshot) => {
            snapshot.docs.map((doc) => {
                if (doc.data()._id == item.brandId) {
                    setUser(doc.data())
                }
            })
        })
        // console.log(user)
    }, [])

    return (
        <View style={styles.formProduct}> 
            <View style={[styles.flexBox, styles.spaceBetween]}>
                <View style={[styles.flexBox, styles.brand]}>
                    <Image 
                        source={{ uri: `${user.uri}` }}
                        style={styles.logoBrand}
                    />
                    <Text style={styles.nameBrand}>{user.name}</Text>
                </View>
                <View style={[styles.flexBox, styles.contact]}>
                    <TouchableOpacity style={[styles.flexBox, styles.box, styles.changeView]}>
                        <Image 
                            source={require('../img/chat.png')}
                            style={[styles.icon, styles.changeIcon]}
                        />
                        <Text style={[styles.contentContact, styles.changeText]}>Mess</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.flexBox, styles.box]}>
                        <Image 
                            source={require('../img/call.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.contentContact}>Call</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.flexBox, styles.infoProduct]}>
                <View style={styles.info}>
                    <Text style={styles.nameProduct}>
                        Name: {item.name.length > maxLength ? `${item.name.substring(0, maxLength)}...` : item.name}
                    </Text>
                    <View style={styles.flexBox}>
                        <View style={[styles.flexBox, styles.alignItems]}>
                            <Image 
                                source={require('../img/type.png')}
                                style={styles.icon}
                            />
                            <Text style={styles.type}>{item.type}</Text>
                        </View>
                        <View style={[styles.flexBox, styles.alignItems]}>
                            <Image 
                                source={require('../img/price.png')}
                                style={styles.icon}
                            />
                            <Text style={styles.type}>{item.price - item.price*item.discount/100}$</Text>
                        </View>
                    </View>
                    <View style={styles.flexBox}>
                        <TouchableOpacity 
                            style={[styles.flexBox, styles.box, styles.changeView, styles.btn]}
                            onPress={addProduct}
                        >
                            <Image 
                                source={require('../img/basket.png')}
                                style={styles.icon}
                            />
                            <Text style={[styles.contentContact, styles.changeText]}>Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.flexBox, styles.box, styles.btn]}
                            onPress={() => {
                                addProduct();
                                navigation.navigate("Payment", userId);
                            }}
                        >
                            <Image 
                                source={require('../img/cart.png')}
                                style={styles.icon}
                            />
                            <Text style={styles.contentContact}>Buy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ImageBackground 
                    style={styles.imgProduct}
                    resizeMode="contain"
                    borderRadius={15}
                    source={{
                        uri: `${item.uri}`
                    }}
                >
                    <TouchableOpacity 
                        style={styles.btnMore} 
                        onPress={()=> navigation.navigate("ProductDetail", {
                            item,
                            userId
                        })}
                    >
                        <Text style={styles.more}>More</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    formProduct: {
        flex: 1,
        paddingHorizontal: wS * 4,
        paddingVertical: wS * 3,
        borderRadius: wS*3,
        marginBottom: 10,
        shadowColor: '#000000',
        elevation: 2,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E6E1E1',
    },
    flexBox: {
        display: 'flex',
        flexDirection: 'row',
    },
    spaceBetween: {
        justifyContent: 'space-between',
    },
    brand: {
        alignItems: 'center',
        height: wS*7.5,
    },  
    logoBrand: {
        width: wS * 8,
        height: wS * 8,
        borderRadius: wS * 7.5,
        objectFit: 'contain',
        borderWidth: 1,
        borderColor: '#cccccc',
    },
    nameBrand: {
        fontSize: 18,
        fontWeight: '500',
        marginLeft: wS * 2.5,
        color: '#000000',
    },
    icon: {
        // borderRadius: 50,
        width: wS*3,
        height: wS*3,
    },
    contact: {
        fontSize: 15,
        maxWidth: wS*40,
        alignContent: 'center',
        borderWidth: 1,
        borderColor: '#E6E1E1',
        borderRadius: wS*7.5,
    },
    box: {
        alignItems: 'center',
        justifyContent: 'center',
        width: wS*18,
        paddingHorizontal: wS*2.5,
        height: wS*7.5,
        borderTopLeftRadius: wS*7.5,
        borderBottomLeftRadius: wS*7.5,
    },
    contentContact: {
        fontSize: 13,
        marginLeft: wS*2.5,
        color: '#000000',
    },
    call: {
        borderLeftWidth: 1,
        borderLeftColor: '#E6E1E1',
    },
    changeView: {
        backgroundColor: '#83F3EC',
    },
    changeIcon: {
        tintColor: '#ffffff',
    },
    changeText: {
        color: '#ffffff',
    },
    infoProduct: {
        flex: 1,
    },
    info: {
        width: wS*45,
    },
    nameProduct: {
        fontSize: 16,
        color: "#000000",
        marginVertical: wS*2,
        fontStyle: 'italic',
        
    },
    alignItems: {
        alignItems: 'center',
        width: wS*23,
    },
    type: {
        marginLeft: 10,
        color: "#000000",
    },
    imgProduct: {
        width: wS*36,
        height: wS*24,
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    btnMore: {
        width: wS*36,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        borderBottomLeftRadius: wS*4,
        borderBottomRightRadius: wS*4,
    },
    more: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    btn: {
        borderWidth: 1,
        borderColor: '#E6E1E1',
        borderRadius: wS*7.5,
        marginRight: wS*5,
        marginTop: wS*5,
    }
});

export default FormProduct;