import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { db } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";

const wS = Dimensions.get('screen').width / 100;

const Product = ({item}) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: `${item.uri}` }} style={styles.imgProduct}/>
            <View style={styles.infoProduct}>
                <Text style={[styles.txtProduct, styles.nameProduct, ]}>Name: {item.name.length > 15 ? `${item.name.substring(0, 12)}...` : item.name}</Text>
                <Text style={[styles.txtProduct, styles.typeProduct]}>Type: {item.type}</Text>
                <Text style={[styles.txtProduct, styles.desProduct]}>{item.description.length > 85 ? `${item.description.substring(0, 1)}`.toLocaleUpperCase() + `${item.description.substring(1, 85)}...`.toLocaleLowerCase() : item.description.substring(0,1).toLocaleUpperCase() + item.description.substring(1).toLocaleLowerCase()}</Text>
            </View>
        </View>
    )
}

const PurchasedGoods = ({route}) => {

    const key = route.params;
    const navigation = useNavigation();
    const [products, setProducts] = useState([])

    useEffect(() => {
        const res = collection(db, 'bought');
        onSnapshot(res, (snapshot) => {
            let lst = [];
            snapshot.docs.map((doc) => {
                if (doc.data().userId === key) {
                    lst.push(doc.data());
                }
            })
            setProducts(lst);
        })
    }, [])

    return (
        <View>
            <View style={[styles.header, styles.alignCenter, styles.justifyCenter]}>
                <TouchableOpacity 
                    style={[styles.callback, styles.alignCenter, styles.justifyCenter]}
                    onPress={() => navigation.navigate("Setting", key)}
                >
                    <Image source={require('../img/left2.png')} style={styles.iconCallback}/>
                </TouchableOpacity>
                <Text style={styles.title}>Purchased Goods</Text>
            </View>
            <ScrollView style={styles.scroll}>
                {products.map((item) => {
                    return <Product item={item} />
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'row',
        // padding: wS*4,
        height: wS*35,
        elevation: 1,
        borderTopLeftRadius: wS*5,
        borderBottomRightRadius: wS*5,
        marginBottom: wS*5,
        alignItems: 'center',
    },
    imgProduct: {
        width: wS*35,
        height: wS*25,
        borderTopLeftRadius: wS*5,
        objectFit: 'contain',
    },
    infoProduct: {
        width: wS*55,
        padding: wS*5,
    },
    nameProduct: {
        fontSize: 16,
        fontWeight: '400',
        color: 'red',
    },
    typeProduct: {
        fontSize: 14,
        fontStyle: 'italic',
    },
    desProduct: {
        fontSize: 13,
    },
    txtProduct: {
        color: '#000000',
        marginBottom: wS,
    },
    header: {
        height: wS * 20,
        elevation: 1,
        backgroundColor: '#ffffff',
        shadowColor: '#000000',
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowRadius: 10,
        shadowOpacity: 1.0,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000',
    },
    alignCenter: {
        alignItems: 'center',
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    scroll: {
        padding: wS*5,
    },
    callback: {
        position: 'absolute',
        left: wS*5,
        width: wS*8,
        height: wS*8,
    },
    iconCallback: {
        width: wS*5,
        height: wS*5,
        objectFit: 'contain',
    },
})

export default PurchasedGoods;