import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity, ImageBackground, FlatList } from "react-native";
import { db } from "../config/firebase";
import { firebase } from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const wS = Dimensions.get('screen').width / 100;

const Form = ({product}) => {

    const navigation = useNavigation();

    const deleteProduct = () => {
        firebase.firestore().collection('product').doc(`${product._id}`).delete()
    }

    return (
        <TouchableOpacity 
            style={styles.form}
            onPress={() => navigation.navigate("UpdateProduct", product)}
        >
            <ImageBackground 
                style={styles.product}
                source={{ uri: `${product.uri}` }}
                resizeMode="contain"
            >
                <TouchableOpacity 
                    style={[styles.delete, styles.alignCenter, styles.justifyCenter]}
                    onPress={deleteProduct}
                >
                    <Image 
                        style={styles.iconTrash}
                        source={require("../img/iconTrash.png")}
                    />
                </TouchableOpacity>
                <View style={[styles.discount, styles.alignCenter, styles.justifyCenter]}>
                    <Text style={styles.price}>Sale: {product.discount}%</Text>
                </View>
            </ImageBackground>
            <FlatList 
                style={styles.infoProduct}
                data={[
                    {key: 'Name', value: `${product.name}`},
                    {key: 'Price', value: `${product.price - product.price*product.discount/100}`},
                    {key: 'Type', value: `${product.type}`}
                ]}
                renderItem={({item}) => {
                    return (
                        <View style={[styles.flexBox, styles.alignCenter, styles.justifyCenter]}>
                            <Image 
                                source={require("../img/iconDot.png")}
                                style={styles.dot}
                            />
                            <Text style={{...styles.info, flex: 0.8}}>{(item.key.length > 7 ? item.value.substring(0, 6) + '...' : item.key)}</Text>
                            <Text style={{...styles.info, flex: 0.1, marginRight: wS*2}}>: </Text>
                            <Text style={{...styles.info, flex: 1}}>{(item.value.length > 7 ? item.value.substring(0, 6) + '...' : item.value)}</Text>
                        </View>
                    );
                }}  
            />
        </TouchableOpacity>
    )
}

const Product = ({ route }) => {

    const {key} = route.params;
    console.log(key)
    const [product, setProduct] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        const res = collection(db, 'product')
        onSnapshot(res, (snapshot) => {
            let lst = []
            snapshot.docs.map((doc) => {
                if (doc.data().brandId == key) {
                    lst.push(doc.data())
                }
            })
            setProduct(lst)
        })
    }, [])


    return (
        <View style={styles.container}>
            <Text style={styles.title}>My product</Text>
            <View style={[styles.flexBox, styles.search]}>
                <TextInput 
                    style={styles.txtSearch}
                    placeholder="Search..."
                />
                <TouchableOpacity style={[styles.toolSearch, styles.alignCenter, styles.justifyCenter]}>
                    <Image 
                        style={styles.iconSearch}
                        source={require('../img/search.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.lstProduct}>
                {product.map((item) => {
                    console.log(item)
                    return <Form product={item} />
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    flexBox: {
        display: 'flex',
        flexDirection: 'row'
    },
    alignCenter: {
        alignItems: 'center',
    },
    justifyCenter: {
        justifyContent: 'center',
    },

    lstProduct: {
        display: 'flex',
        flexDirection: 'row',
        gap: wS*4,
        flexWrap: 'wrap',
    },
    form: {
        width: wS*43,
        height: wS*50,
        borderRadius: wS*2,
        borderWidth: 1,
        borderColor: '#cccccc',
        backgroundColor: '#F5F5F5',
        elevation: 1,
        shadowColor: '#ccc',
    },
    product: {
        height: wS*30,
        borderTopLeftRadius: wS*2,
        borderTopRightRadius: wS*2,
    },
    delete: {
        width: wS*9,
        height: wS*6,
        backgroundColor: 'red',
        position: 'absolute',
        right: 0,
        borderBottomLeftRadius: wS*2,
      },
    iconTrash: {
        width: wS*4,
        height: wS*4,
        tintColor: '#ffffff',
    },
    discount: {
        width: wS*18,
        height: wS*5,
        backgroundColor: 'yellow',
        position: 'absolute',
        bottom: 0,
        left: 0,
        borderTopRightRadius: wS*2,
    },
    price: {
        color: 'red',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 10,
    },
    infoProduct: {
        paddingVertical: wS*2,
        paddingHorizontal: wS*4,
    },
    dot: {
        width: wS*2,
        height: wS*2,
        objectFit: 'contain',
        marginRight: wS*2,
    },
    info: {
        color: '#000',
    },

    container: {
        padding: wS*5,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000000',
    },
    search: {
        backgroundColor: '#F5F5F5',
        height: wS*12,
        marginVertical: wS*5,
        borderRadius: wS*6,
        paddingHorizontal: wS*2,
        elevation: 2,
        shadowColor: '#ccc',
        borderWidth: 1,
        borderColor: '#ccc'
    },
    txtSearch: {
        flex: 1,
        paddingLeft: wS*6,

    },
    toolSearch: {
        width: wS*12,
        height: wS*12,
    },
    iconSearch: {
        width: wS*6,
        height: wS*6,
        objectFit: 'contain',
    }
})

export default Product;