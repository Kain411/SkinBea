import React, { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import FormProduct from "../components/FormProduct";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

const wS = Dimensions.get('screen').width / 100;

const Home = ({ navigation, route }) => {

    const {key} = route.params;
    // console.log('Home: ', key);
    const [selectType, setSelectType] = useState(0);
    const [selectBrand, setSelectBrand] = useState(0);

    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    const getProducts = () => {
        const productsQuery = collection(db, 'product');
        onSnapshot(productsQuery, (snapshot) => {
            let lst = []
            snapshot.docs.map((doc) => {
                // console.log(doc.data().name)
                lst.push({ ...doc.data(), id: doc.id });
            })
            setProducts(lst);
        })
    }

    const getUser = () => {
        const res = collection(db, 'user')
        onSnapshot(res, (snapshot) => {
            let lst = [];
            snapshot.docs.map((doc) => {
                lst.push(doc.data())
                if (doc.data()._id == key) {
                    setUser(doc.data())
                }
            })
            setUsers(lst);
        })
    }

    // console.log(doc(db, 'user', key))
    useEffect(() => {
        getProducts();
        getUser();
    }, []);

    useEffect(() => {

    }, [selectBrand, selectType])

    const product = [
        { key: '0', value: 'Select' },
        { key: '1', value: 'DHA' },
        { key: '2', value: 'Serum' },
        { key: '3', value: 'Moisturizer' },
        { key: '4', value: 'Sunscreen' },
        { key: '5', value: 'Make-up remove' },
    ];

    const brand = [
        { key: '0', value: 'Select' },
        { key: '1', value: 'Loreal' },
        { key: '2', value: 'Hadalabo' },
        { key: '3', value: 'Asa' },
    ];

    return (
        <ScrollView style={styles.container}>
            <Image
                source={require('../img/logo.png')}
                style={styles.logo}
            />
            <View style={[styles.flexBox, styles.formSearch]}>
                <View style={[styles.flexBox, styles.search]}>
                    <TextInput
                        style={styles.inputSearch}
                        placeholder="Search..."
                    />
                    <Image
                        source={require('../img/search.png')}
                        style={styles.iconSearch}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Goods', key)}
                >
                    <Image
                        source={require('../img/basket.png')}
                        style={styles.iconCart}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('User')}
                    style={{borderWidth: 1, borderColor: '#ccc', padding: 3, borderRadius: wS*100}}
                >
                    <Image
                        source={{ uri: `${user.uri}` }}
                        style={styles.account}
                    />
                </TouchableOpacity>
            </View>
            <View style={[styles.flexBox, styles.formSearch]}>
                <SelectList
                    data={product}
                    setSelected={setSelectType}
                    placeholder="Select"
                    maxHeight={wS * 30}
                    boxStyles={{
                        alignSelf: 'center',
                        width: wS * 60,
                        height: wS * 12,
                        borderRadius: wS * 5,
                    }}
                    dropdownStyles={{
                        marginTop: 5,
                        width: wS * 60,
                        position: 'absolute',
                        marginTop: wS*12,
                        zIndex: 999,
                        backgroundColor: '#ffffff',
                    }}
                />
                <SelectList
                    data={brand}
                    setSelected={setSelectBrand}
                    placeholder="Select"
                    maxHeight={wS * 30}
                    boxStyles={{
                        alignItems: 'center',
                        width: wS * 28,
                        height: wS * 12,
                        borderRadius: wS * 5,
                    }}
                    dropdownStyles={{
                        marginTop: 5,
                        width: wS * 28,
                        position: 'absolute',
                        marginTop: wS*12,
                        zIndex: 999,
                        backgroundColor: '#ffffff'
                    }}
                />


            </View>
            {products.map((item) => {
                if (selectType == 0 || item.type === product[selectType].value )  {
                    let name = "";
                    users.map((snap) => {
                        if (snap._id == item.brandId) name = snap.name;
                    })
                    if (selectBrand == 0 || name === brand[selectBrand].value) {
                        return (
                        <FormProduct
                            key={item.id}
                            item={item}
                            userId={key}
                        />
                    );
                    }
                }
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wS * 5,
        paddingVertical: wS * 2.5,
        flex: 1,
        backgroundColor: '#fff'
    },
    logo: {
        width: wS * 40,
        height: wS * 15,
    },
    flexBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    formSearch: {
        marginVertical: wS * 2.5,
        alignItems: 'center',
    },
    search: {
        width: wS * 60,
        height: wS * 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#ccc',
        borderWidth: 1,
        borderColor: '#ccc'
    },
    inputSearch: {
        marginLeft: wS * 4,
        flex: 1,
    },
    iconSearch: {
        marginRight: wS * 4,
        width: wS * 5,
        height: wS * 5,
    },
    account: {
        width: wS * 10,
        height: wS * 10,
        borderRadius: wS * 5,
        objectFit: 'contain',
        backgroundColor: '#ffffff',
    },
    iconCart: {
        width: wS*7,
        height: wS*7,
        objectFit: 'contain',
    }
});

export default Home;