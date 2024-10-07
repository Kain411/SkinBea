import { Button, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from "../config/firebase";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { cloneElement, useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";

const wS = Dimensions.get('screen').width / 100;

const Info = ({name, info, user}) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            style={[styles.btn, styles.flexBox]} 
            onPress={() => navigation.navigate("ChangeInfoUser", user)}
        >
            <Text style={[styles.attribute, styles.textBtn]}>{name}</Text>
            <View style={[styles.flexBox, styles.right]}>
                <Text style={[styles.info, styles.textBtn]}>{info !== undefined && info.length > 15 ? `${info.substring(0, 15)}...` : info}</Text>
                <Image 
                    style={styles.icon}
                    source={require('../img/select.png')}
                />
            </View>
        </TouchableOpacity>
    );
}

const User = ({ route }) => {

    const {key} = route.params;
    console.log('User key: ', key)

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

    console.log(JSON.stringify(user, null , 1))
    console.log('User: ', user)

    // const update = async () => {
    //     const user = doc(db, 'user', 'SEvTYuEl00A3JtI03qSR')
    //     await updateDoc(user, {
    //         name: 'Tzei'
    //     })
    // }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={[styles.center, styles.avt]}>
                <Image
                    style={styles.imgAvatar}
                    source={{ uri: `${user.uri}` }}
                />
                <TouchableOpacity 
                    style={[styles.center, styles.change]}
                    onPress={() => navigation.navigate("ChangeInfoUser", user)}
                >
                    <Text style={styles.textChange}>Touch to change</Text>
                </TouchableOpacity>
            </View>
            <Info 
                name='Name'
                info={user.name}
                user={user}
            />    
            <Info 
                name='Gender'
                info={user.gender}
                user={user}
            />  
            <Info 
                name='Date of birth'
                info={user.dob}
                user={user}
            />  
            <Info 
                name='Address'
                info={user.address}
                user={user}
            />  
            <Info 
                name='Phone'
                info={user.phone}
                user={user}
            />   
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    avt: {
        width: wS * 100,
        height: wS * 60,
        backgroundColor: '#CDE3C9'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgAvatar: {
        width: wS * 20,
        height: wS * 20,
        objectFit: 'contain',
        borderRadius: wS * 10,
        backgroundColor: '#ffffff',
    },
    change: {
        width: wS * 100,
        height: wS * 8,
        backgroundColor: '#6B6E6B',
        position: 'absolute',
        bottom: 0,
    },
    textChange: {
        color: '#ffffff',
    },
    btn: {
        width: wS * 100,
        height: wS * 15,
        paddingHorizontal: wS * 5,
        alignItems: 'center',
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1,
    },
    flexBox: {
        display: 'flex',
        flexDirection: 'row',
    },
    attribute: {
        flex: 1,
    },
    right: {
        alignItems: 'center',
    },
    icon: {
        width: wS*5,
        height: wS*5,
        objectFit: 'cover',
        transform: [{rotate: '-90deg'}],
        marginLeft: wS*3,
    },
    textBtn: {
        fontSize: 16,
        color: '#000000',
    }
})

export default User;