import { useNavigation } from "@react-navigation/native";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react"
import { Dimensions, Image, StyleSheet, TextInput, TouchableOpacity, View, Text, Alert, Button } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../config/firebase";
import { launchImageLibrary as _launchImageLibrary, launchCamera as _launchCamera } from 'react-native-image-picker';

const wS = Dimensions.get('screen').width / 100;
let launchImageLibrary = _launchImageLibrary;
let launchCamera = _launchCamera;
const Change = ({ property }) => {
    return (
        <View style={styles.info}>
            <Text style={styles.old}>{property}: </Text>
            <View style={{ ...styles.flexBox, alignItems: 'center' }}>
                <TextInput
                    style={styles.new}
                    placeholder="Enter new value..."
                    onChangeText={(text) => handleChange(text)}
                />
                <View style={[styles.change, styles.center]}>
                    <Image style={styles.edit} source={require('../img/edit.png')} />
                </View>
            </View>
        </View>
    )
}


const ChangeInfoUser = ({ route }) => {


    const navigation = useNavigation();

    const user = route.params;
    console.log(user)

    const [id, setId] = useState(`${user._id}`)
    const [uri, setUri] = useState(`${user.uri}`)
    const [name, setName] = useState(`${user.name}`)
    const [gender, setGender] = useState(`${user.gender}`)
    const [dob, setDob] = useState(`${user.dob}`)
    const [address, setAddress] = useState(`${user.address}`)
    const [phone, setPhone] = useState(`${user.phone}`)
    const [email, setEmail] = useState(`${user.email}`)

    const imghtai = user._id;

    const openImagePicker = () => {

        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };
        launchImageLibrary(options, handleResponse);
        console.log('img');
    };

    const handleCameraLaunch = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchCamera(options, handleResponse);
        console.log('cam');
    };

    const handleResponse = (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('Image picker error: ', response.error);
        } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;
            setUri(imageUri);
        }
    };

    const update = async () => {
        const user = doc(db, 'user', id)
        await updateDoc(user, {
            uri: uri,
            name: name,
            gender: gender,
            dob: dob,
            address: address,
            phone: phone,
            email: email
        })
        navigation.navigate("User")
    }

    console.log(user.uri)

    return (
        <View>
            <View style={[styles.flexBox, styles.back]}>
                <TouchableOpacity
                    style={[styles.return, styles.center]}
                    onPress={() => navigation.navigate('User')}
                >
                    <Image
                        source={require("../img/left2.png")}
                        style={styles.callback}
                    />
                </TouchableOpacity>
                <Text style={styles.txtCallback}>Callback</Text>
            </View>
            <View style={styles.center}>

                <View style={[styles.flexBox, styles.center, styles.uri]}>
                    {uri === imghtai ? <Image
                        style={styles.image}
                        source={{
                            uri: `${user.uri}`
                        }}
                        resizeMode="contain"
                    />
                        :
                        <Image
                            style={styles.image}
                            source={{
                                uri: uri
                            }}
                            resizeMode="contain"
                        />
                    }
                    <View style={styles.center}>
                        <View>
                            <Button title="Choose from Device" onPress={openImagePicker} />
                            <View style={{ marginVertical: 8 }}></View>
                            <Button title="Open Camera" onPress={handleCameraLaunch} />
                        </View>
                    </View>
                </View>

                <ScrollView style={{ width: wS * 100 }}>
                    <View style={styles.info}>
                        <Text style={styles.old}>Name: </Text>
                        <View style={{ ...styles.flexBox, alignItems: 'center' }}>
                            <TextInput
                                style={styles.new}
                                placeholder="Enter new value..."
                                onChangeText={(text) => setName(text)}
                            />
                            <View style={[styles.change, styles.center]}>
                                <Image style={styles.edit} source={require('../img/edit.png')} />
                            </View>
                        </View>
                    </View>

                    <View style={styles.info}>
                        <Text style={styles.old}>Gender: </Text>
                        <View style={{ ...styles.flexBox, alignItems: 'center' }}>
                            <TextInput
                                style={styles.new}
                                placeholder="Enter new value..."
                                onChangeText={(text) => setGender(text)}
                            />
                            <View style={[styles.change, styles.center]}>
                                <Image style={styles.edit} source={require('../img/edit.png')} />
                            </View>
                        </View>
                    </View>

                    <View style={styles.info}>
                        <Text style={styles.old}>Date of birth: </Text>
                        <View style={{ ...styles.flexBox, alignItems: 'center' }}>
                            <TextInput
                                style={styles.new}
                                placeholder="Enter new value..."
                                onChangeText={(text) => setDob(text)}
                            />
                            <View style={[styles.change, styles.center]}>
                                <Image style={styles.edit} source={require('../img/edit.png')} />
                            </View>
                        </View>
                    </View>

                    <View style={styles.info}>
                        <Text style={styles.old}>Nationality: </Text>
                        <View style={{ ...styles.flexBox, alignItems: 'center' }}>
                            <TextInput
                                style={styles.new}
                                placeholder="Enter new value..."
                                onChangeText={(text) => setAddress(text)}
                            />
                            <View style={[styles.change, styles.center]}>
                                <Image style={styles.edit} source={require('../img/edit.png')} />
                            </View>
                        </View>
                    </View>

                    <View style={styles.info}>
                        <Text style={styles.old}>Phone: </Text>
                        <View style={{ ...styles.flexBox, alignItems: 'center' }}>
                            <TextInput
                                style={styles.new}
                                placeholder="Enter new value..."
                                onChangeText={(text) => setPhone(text)}
                            />
                            <View style={[styles.change, styles.center]}>
                                <Image style={styles.edit} source={require('../img/edit.png')} />
                            </View>
                        </View>
                    </View>

                </ScrollView>
                <TouchableOpacity
                    style={[styles.update, styles.center]}
                    onPress={update}
                >
                    <Text style={styles.txt}>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    flexBox: {
        display: 'flex',
        flexDirection: 'row',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        // flexDirection: 'row',
    },
    back: {
        marginTop: wS * 2,
        marginLeft: wS * 2,
    },
    callback: {
        width: wS * 5,
        height: wS * 5,
    },
    return: {
        width: wS * 10,
        height: wS * 10,
        borderRadius: wS * 6,
        backgroundColor: '#ccc',
    },
    txtCallback: {
        fontSize: 30,
        marginLeft: wS * 2,
    },
    uri: {
        paddingHorizontal: wS * 10,
        paddingVertical: wS * 3,
        justifyContent: 'space-evenly'
    },
    image: {
        width: wS * 28,
        height: wS * 28,
        objectFit: 'cover',
        borderRadius: wS * 16,
        marginRight: wS * 10,
        borderColor: '#81d773',
        borderWidth: 5,
    },
    newImg: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width: wS * 50,
        height: wS * 8,
        padding: 0,
        paddingLeft: wS * 4,
        color: '#000000',
        borderRadius: wS * 2,
    },
    btn: {
        marginTop: wS,
        backgroundColor: 'aqua',
        width: wS * 20,
        height: wS * 8,
        borderRadius: wS * 2,
    },
    txt: {
        color: '#ffffff',
        fontWeight: '800',
    },
    info: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginHorizontal: wS * 4,
        paddingHorizontal: wS * 4,
        paddingTop: wS * 3,
        paddingBottom: wS * 4,
    },
    old: {
        fontSize: 20,
        marginBottom: wS * 2,
    },
    new: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#6B6E6B',
        height: wS * 8,
        padding: 0,
        paddingLeft: wS * 4,
        borderTopLeftRadius: wS * 2,
        borderBottomLeftRadius: wS * 2,
    },
    change: {
        width: wS * 8,
        height: wS * 8,
        backgroundColor: '#6B6E6B',
        borderWidth: 1,
        borderColor: '#6B6E6B',
        borderTopRightRadius: wS * 2,
        borderBottomRightRadius: wS * 2,
    },
    edit: {
        width: wS * 4,
        height: wS * 4,
        objectFit: 'cover',
        tintColor: '#fff',
    },
    update: {
        width: wS * 30,
        height: wS * 10,
        backgroundColor: 'red',
        borderRadius: wS * 2,
        marginTop: wS * 2,
    }
})

export default ChangeInfoUser;