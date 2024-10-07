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
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

const wS = Dimensions.get('screen').width / 100;

const Setting = ({ route }) => {

    const { key } = route.params;
    console.log('Setting: ', key)

    const navigation = useNavigation();
    const handleExit = () => {
        Alert.alert(
            'Xác nhận thoát',
            'Bạn có muốn đăng xuất không?',
            [
                {
                    text: 'Không',
                    onPress: () => console.log('Không thoát'),
                    style: 'cancel',
                },
                {
                    text: 'Có',
                    onPress: () => {
                        // Thực hiện hành động thoát ở đây
                        navigation.navigate("LogIn")
                    },
                },
            ],
            { cancelable: false }
        );
    };

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

    return (
        <SafeAreaView
            style={{
                flex: 100,
                backgroundColor: '#fff'
            }}
        >
            <View
                style={{
                    flex: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 18,
                    alignItems: 'center',
                    marginVertical: 10,
                }}
            >
                <Text style={{
                    fontSize: 30,
                    color: '#000',
                    fontWeight: '700',
                }}>Setting</Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#ccc',
                        padding: 5,
                        borderRadius: 50,
                    }}
                    onPress={() => {

                    }}
                >
                    <Image
                        style={{
                            width: 30,
                            height: 30,
                        }}
                        source={require("../img/setting.png")} />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flex: 20,
                    // flexDirection: 'row',
                    marginHorizontal: 15,
                    borderColor: '#ccc',
                    borderWidth: 1,
                    borderRadius: wS * 3,
                    backgroundColor: '#fff'
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 20,
                        marginTop: 30,
                        alignItems: 'center',
                        borderBottomWidth: 2,
                        borderColor: '#ccc',
                        paddingBottom: 20,
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <Image
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 50,
                                backgroundColor: '#fff',
                                objectFit: 'contain'
                            }}
                            source={{ uri: `${user.uri}` }} />
                        <Text
                            style={{
                                marginStart: 20,
                                fontSize: 30,
                                color: '#000',
                            }}
                        >{user.name}</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#ccc',
                            padding: 2,
                            borderRadius: 50,
                        }}
                        onPress={() => {

                        }}
                    >
                        <Image
                            style={{
                                width: 20,
                                height: 20,
                            }}
                            source={require("../img/select.png")} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        marginHorizontal: 20,
                        alignItems: 'center',
                        flex: 1,
                    }}
                    onPress={() => {
                        navigation.navigate('SignUp')
                    }}
                >
                    <Image
                        style={{
                            width: 20,
                            height: 20,
                            marginRight: 5,
                            // padding: 50,
                        }}
                        source={require("../img/add.png")} />
                    <Text
                        style={{
                            fontSize: 16,
                            fontStyle: 'italic',
                        }}
                    >Create a new account</Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flex: 30,
                    marginTop: 15,
                    // backgroundColor: 'red',
                    justifyContent: 'center',
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        marginHorizontal: 15,
                    }}
                >
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Goods", key)
                            // {alert("hele");}
                        }
                        style={{
                            flex: 1,
                            // backgroundColor: 'red',
                            borderColor: '#ccc',
                            borderWidth: 1,
                            borderRadius: 4,
                            paddingVertical: 15,
                            paddingLeft: 9,
                        }}
                    >
                        <Image
                            style={{
                                width: 20,
                                height: 20,

                            }}
                            source={require("../img/basket.png")} />
                        <Text style={{ color: '#000', }}>Goods</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            // backgroundColor: 'red',
                            borderColor: '#ccc',
                            borderWidth: 1,
                            borderRadius: 4,
                            paddingVertical: 15,
                            paddingLeft: 9,
                            marginStart: 5,
                        }}
                        onPress={() => {
                            navigation.navigate("PurchasedGoods", key)
                        }}
                    >
                        <Image
                            style={{
                                width: 20,
                                height: 20,

                            }}
                            source={require("../img/cart.png")} />
                        <Text style={{ color: '#000', }}>Purchased goods</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        marginHorizontal: 15,
                        marginTop: 5,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            borderColor: '#ccc',
                            borderWidth: 1,
                            borderRadius: 4,
                            paddingVertical: 15,
                            paddingLeft: 9,
                        }}
                        onPress={() => {

                        }}
                    >
                        <Image
                            style={{
                                width: 20,
                                height: 20,

                            }}
                            source={require("../img/transport.png")} />
                        <Text style={{ color: '#000', }}>Being transported</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            // backgroundColor: 'red',
                            borderColor: '#ccc',
                            borderWidth: 1,
                            borderRadius: 4,
                            paddingVertical: 15,
                            paddingLeft: 9,
                            marginStart: 5,
                        }}
                        onPress={() => {

                        }}
                    >
                        <Image
                            style={{
                                width: 20,
                                height: 20,

                            }}
                            source={require("../img/love.png")} />
                        <Text style={{ color: '#000', }}>Favorite</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{
                        marginTop: 10,
                        backgroundColor: '#ccc',
                        height: 30,
                        alignItems: 'center',
                        marginHorizontal: 15,
                        justifyContent: 'center',
                        borderRadius: 3,
                    }}
                    onPress={() => {

                    }}>
                    <Text style={{ color: '#000', }}>More</Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flex: 40,
                }}
            >
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        borderColor: '#ccc',
                        borderTopWidth: 1,
                        paddingTop: 10,
                        marginTop: 10,
                    }}
                    onPress={() => {

                    }}
                >
                    <View
                        style={{
                            backgroundColor: '#ccc',
                            borderRadius: 50,
                            padding: 3,
                            marginStart: 15,
                            marginEnd: 5,
                        }}
                    >
                        <Image
                            style={{
                                width: 18,
                                height: 18,
                            }}
                            source={require("../img/setting.png")} />
                    </View>
                    <Text style={{ color: '#000', fontSize: 18, }}>Setting & Access</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        borderColor: '#ccc',
                        borderTopWidth: 1,
                        paddingTop: 10,
                        marginTop: 10,

                    }}
                    onPress={() => {

                    }}
                >
                    <View
                        style={{
                            backgroundColor: '#ccc',
                            borderRadius: 50,
                            padding: 3,
                            marginStart: 15,
                            marginEnd: 5,
                        }}
                    >
                        <Image
                            style={{
                                width: 18,
                                height: 18,
                            }}
                            source={require("../img/help.png")} />
                    </View>
                    <Text style={{ color: '#000', fontSize: 18, }}>Support & Help</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        borderColor: '#ccc',
                        borderTopWidth: 1,
                        paddingTop: 10,
                        marginTop: 10,
                    }}
                    onPress={() => {

                    }}
                >
                    <View
                        style={{
                            backgroundColor: '#ccc',
                            borderRadius: 50,
                            padding: 3,
                            marginStart: 15,
                            marginEnd: 5,
                        }}
                    >
                        <Image
                            style={{
                                width: 18,
                                height: 18,
                            }}
                            source={require("../img/comment.png")} />
                    </View>
                    <Text style={{ color: '#000', fontSize: 18, }}>Comments</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: '#ccc',
                        marginHorizontal: 15,
                        marginVertical: 30,
                        padding: 8,
                        alignItems: 'center',
                        borderRadius: 4,
                    }}
                    onPress={handleExit}>
                    <Text style={{ color: '#000' }}>Sign out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Setting;