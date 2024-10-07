import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import { Image, View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { 
    Welcome ,
    LogIn,
    SignUp,
    Home,
    Product,
    Post,
    User,
    Setting,
    ProductDetail,
    ChangeInfoUser,
    Goods,
    Payment,
    Payment_Success,
    UpdateProduct,
    PurchasedGoods
} from "./src/screens";

const wS = Dimensions.get('screen').width / 100;

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const SingleBtn = ({ src, text, focused }) => {
    return (
        <View style={styles.btn}>
            <Image source={src} style={{ ...styles.icon, objectFit: 'cover', tintColor: focused ? '#81D773' : '#000000' }} />
            <Text style={{ color: focused ? '#81D773' : '#000000' }} >{text}</Text>
        </View>
    );
}

const PostNew = ({ text, focused }) => {
    return(
        <View style={styles.btn}>
            <Image source={require('./src/img/iconWhite.jpg')} style={{ ...styles.icon, tintColor: 'rgba(0,0,0,0)'}} />
            <Text style={{ ...styles.post, color: focused ? '#81D773' : '#000000' }} >{text}</Text>
            <View style={styles.borderPost}>
                <Image 
                    style={styles.postNew}
                    source={require('./src/img/story.png')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    btn: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: wS * 5,
        height: wS * 5,
        objectFit: 'cover'
    },
    borderPost: {
        width: wS*15,
        height: wS*15,
        backgroundColor: '#81D773',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wS*15,
        borderWidth: 1,
        borderColor: '#ccc',
        position: 'absolute',
        top: -wS*7,
    },
    postNew: {
        width: wS*9,
        height: wS*9,
    },
    post: {
    }
})

const MyTab = ({route}) => {

    const key = route.params
    console.log('MyTab: ', key)

    return (
        <Tab.Navigator
            style={styles.bottomTag}
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    height: wS*18,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    backgroundColor: '#ffffff',
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderColor: '#ccc'
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                initialParams={{
                    key: key
                }}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <SingleBtn src={require('./src/img/iconHome.png')} text="Home" focused={focused} />
                    }
                }}
            />
            <Tab.Screen
                name="Product"
                component={Product}
                initialParams={{
                    key: key
                }}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <SingleBtn src={require('./src/img/iconProduct.png')} text="Product" focused={focused} />
                    }
                }}
            />
            <Tab.Screen 
                name="Post"
                component={Post}
                initialParams={{
                    key: key
                }}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <PostNew text="Post" focused={focused} />
                    }
                }}
            />
            <Tab.Screen
                name="User"
                component={User}
                initialParams={{
                    key: key
                }}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <SingleBtn src={require('./src/img/iconUser.png')} text="User" focused={focused} />
                    }
                }}
            />
            <Tab.Screen
                name="Setting"
                component={Setting}
                initialParams={{
                    key: key
                }}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <SingleBtn src={require('./src/img/iconSetting.png')} text="Setting" focused={focused} />
                    }
                }}
            />
        </Tab.Navigator>
    );
};

const Start = () => {
    return (

        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="LogIn" component={LogIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="MyTab" component={MyTab} />
                <Stack.Screen name="ChangeInfoUser" component={ChangeInfoUser} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} />
                <Stack.Screen name="UpdateProduct" component={UpdateProduct} />
                <Stack.Screen name='Goods' component={Goods} />
                <Stack.Screen name='PurchasedGoods' component={PurchasedGoods} />
                <Stack.Screen name='Payment' component={Payment} />
                <Stack.Screen name='Payment_Success' component={Payment_Success} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Start;