import { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Image, ImageBackground, Dimensions, TextInput } from "react-native"
import { SelectList } from "react-native-dropdown-select-list";
import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const wS = Dimensions.get("screen").width / 100;

const UpdateProduct = ({ route }) => {

    const product = route.params;
    console.log("Product: ", product)

    const navigation = useNavigation();

    const [discount, setDiscount] = useState(product.discount)
    const [selected, setSelected] = useState("");
    const [user, setUser] = useState({})

    const data = [
        { key: 0, value: '10' },
        { key: 1, value: '20' },
        { key: 2, value: '30' },
        { key: 3, value: '40' },
        { key: 4, value: '50' },
    ]

    useEffect(() => {
        const res = doc(db, 'user', product.brandId)
        setUser(res)
    }, [])

    const update = async () => {
        const res = doc(db, 'product', product._id)
        await updateDoc(res, {
            _id: product._id,
            brandId: product.brandId,
            description: product.description,
            name: product.name,
            type: product.type,
            uri: product.uri,
            price: product.price,
            discount: discount
        })
        navigation.navigate("User")
    }

    return (
        <View styles={styles.container}>
            <View style={styles.product}>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.navigate('Product')}
                >
                    <Image
                        source={require("../img/left2.png")}
                        style={styles.callback}
                    />
                </TouchableOpacity>
                <ImageBackground
                    style={styles.imgProduct}
                    resizeMode="contain"
                    source={{ uri: `${product.uri}` }}
                />
            </View>
            <TouchableOpacity style={[styles.alignCenter, styles.justifyCenter, styles.changeImg]}>
                <Text style={{ ...styles.txt, fontSize: 15, color: '#ffffff' }}>Change image product</Text>
            </TouchableOpacity>
            <View style={[styles.info, styles.justifyCenter]}>
                <View style={[styles.flexBox, styles.alignCenter]}>
                    <Text style={styles.txt}>Brand: </Text>
                    <Text style={styles.txtInfo}>
                        {product._id}
                    </Text>
                </View>
                <View style={[styles.flexBox, styles.alignCenter]}>
                    <Text style={styles.txt}>Name: </Text>
                    <Text style={styles.txtInfo}>
                        {product.name}
                    </Text>
                </View>
                <View style={[styles.flexBox, styles.alignCenter]}>
                    <Text style={styles.txt}>Type: </Text>
                    <Text style={styles.txtInfo}>
                        {product.type}
                    </Text>
                </View>
                <View style={[styles.flexBox, styles.alignCenter]}>
                    <Text style={styles.txt}>Price: </Text>
                    <Text style={styles.txtInfo}>
                        {product.price}$
                    </Text>
                </View>
                <View style={{ ...styles.flexBox, ...styles.alignCenter, marginBottom: wS * 5 }}>
                    <Text style={styles.txt}>Discount: </Text>
                    <SelectList
                        data={data}
                        setSelected={(select) => {
                            setSelected(select)
                            setDiscount(data[select].value)
                        }}
                        placeholder="Select"
                        maxHeight={wS * 50}
                        boxStyles={{
                            // alignSelf: 'center',
                            alignItems: 'center',
                            // justifyContent: 'center',
                            width: wS * 20,
                            height: wS * 10,
                            borderRadius: wS * 5,
                        }}
                        dropdownStyles={{
                            width: wS * 30,
                            position: 'absolute',
                            marginTop: - wS * 20,
                            zIndex: 999,
                            backgroundColor: '#ffffff',
                            elevation: 80,
                            borderColor: '#cccccc',
                            borderWidth: 1,
                        }}
                    />
                    <TouchableOpacity
                        style={[styles.send, styles.alignCenter, styles.justifyCenter]}
                        onPress={update}
                    >
                        <Image
                            source={require('../img/iconSend.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{}}>
                    <Text style={styles.txt}>Description: </Text>
                    <Text style={{ ...styles.txtInfo, marginLeft: 0, marginTop: wS * 2 }}>
                        {product.description}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'red'
    },
    flexBox: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: wS * 2,
        height: wS * 8,
        marginHorizontal: 'auto',
    },
    alignCenter: {
        alignItems: 'center',
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    product: {
        paddingVertical: wS * 2,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    imgProduct: {
        width: wS * 100,
        height: wS * 50,
    },
    changeImg: {
        backgroundColor: '#cccccc',
        height: wS * 8,
    },
    info: {
        paddingHorizontal: wS * 8,
        marginTop: wS * 4,
    },
    txt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    txtInfo: {
        fontSize: 16,
        fontStyle: 'italic',
        marginLeft: wS * 2,
        color: '#000000',
    },
    sale: {
        backgroundColor: 'aqua',
        width: wS * 15,
        marginLeft: wS * 2,
        borderRadius: wS * 2,
    },
    send: {
        borderWidth: 1,
        width: wS * 10,
        height: wS * 8,
        borderRadius: wS * 4,
        marginLeft: wS * 32,
    },
    icon: {
        width: wS * 5,
        height: wS * 5,
        objectFit: 'contain',
    },
    callback: {
        width: wS * 5,
        height: wS * 5,

    },
    btn: {
        width: wS * 10,
        height: wS * 10,
        marginTop: wS * 2,
        marginLeft: wS * 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wS * 6,
        backgroundColor: '#ccc'
    },
})

export default UpdateProduct;