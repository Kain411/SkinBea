import React from 'react';
import {
  StyleSheet, Text, View, Dimensions, Image, TextInput, TouchableOpacity,
  Keyboard,
} from 'react-native';
import { isValidEmail, isValidPassword } from '../utilies/Validations'
import { useState, useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "../config/firebase";
import { db } from '../config/firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';

const { width, height } = Dimensions.get('screen')

const LogIn = () => {
  const [ok, setOk] = useState(false)
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const getKeyUser = (email) => {
    const user = collection(db, 'user')
    onSnapshot(user, (snapshot) => {
      snapshot.docs.map((doc) => {
        if (doc.data().email == email) {
          navigation.navigate('MyTab', doc.data()._id);
        }
      })
    })
  }


  //firebase- auth
  const auth = getAuth();
  const createLogin = (email, password) => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Đăng nhập thành công
          const user = userCredential.user;

          getKeyUser(email)

          resolve(user.email); // Trả về email của người dùng khi đăng nhập thành công
        })
        .catch((error) => {
          setOk(true);
          // Xử lý lỗi đăng nhập
          const errorMessage = error.message;
          reject(errorMessage); // Trả về thông báo lỗi nếu đăng nhập không thành công
        });
    });
  };



  const handleLogin = async () => {
    try {
      const loggedInUserEmail = await createLogin(email, password); //email, password
      console.log("Đăng nhập thành công với email:", loggedInUserEmail);
      // setEmail('')
      // setPassword('')
      // Thực hiện các hành động sau khi đăng nhập thành công, chẳng hạn như chuyển hướng người dùng đến trang khác
    } catch (error) {
      console.log("Thông tin đăng nhập không chính xác:", error);
      // Xử lý trường hợp thông tin đăng nhập không chính xác
    }
  };

  //navigtion
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image style={styles.logoimg} source={require('../img/logo1.png')} />
        </View>
        <View style={styles.windowlogin}>
          <View style={styles.login}>

            <View style={styles.windowregister}>
              <Text style={styles.register}>
                Log In
              </Text>
            </View>

            {ok && <View style={styles.windowError}>
              <Image style={styles.error} source={require('../img/error.png')} />
              <Text style={{ color: 'red', fontStyle: 'italic' }}>Username or password is fail</Text>
            </View>}

            <View>
              <View style={styles.inputContainer}>
                <Text style={styles.text}>Username:</Text>
                <View style={styles.input}>
                  <View style={styles.inputText}>
                    <View style={{ height: 38, width: 38, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                      <Image style={styles.user} source={require('../img/user.png')} />
                    </View>
                    <View style={{ height: 38, width: 2, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                      <View style={{
                        width: 2,
                        height: 30,
                        backgroundColor: 'black',
                      }}>
                      </View>
                    </View>

                    <TextInput
                      onChangeText={(text) => {
                        setErrorEmail(isValidEmail(text) == true ?
                          '' : 'Email not in correct format')
                        setEmail(text)
                      }}
                      keyboardType='email'
                      value={email}
                      placeholder="Your username" style={styles.inputContent} />


                  </View>
                  <Text style={{
                    color: 'red',
                    fontSize: 10,
                    marginBottom: 15,
                  }}>{errorEmail}</Text>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.text}>Password:</Text>
                <View style={styles.input}>
                  <View style={styles.inputText}>
                    <View style={{ height: 38, width: 38, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                      <Image style={styles.user} source={require('../img/Vector.png')} />
                    </View>
                    <View style={{ height: 38, width: 2, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                      <View style={{
                        width: 2,
                        height: 30,
                        backgroundColor: 'black',
                      }}>
                      </View>
                    </View>

                    <TextInput
                      onChangeText={(text) => {
                        setErrorPassword(isValidPassword(text) == true ?
                          '' : 'Password must be at least 3 characters')
                        setPassword(text)
                      }}
                      secureTextEntry={true}
                      value={password}
                      placeholder="**********" style={styles.inputContent} />

                      
                  </View>
                  <Text style={{
                    color: 'red',
                    fontSize: 10,
                    marginBottom: 15,
                  }}>{errorPassword}</Text>
                </View>
              </View>
            </View>

            <View style={styles.account}>
              <Text style={{ fontStyle: 'italic' }}>You don’t have an account?  </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={{ color: '#9cdf91', fontStyle: 'italic', textDecorationLine: 'underline', marginLeft: 10 }}>Register</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.submit}>
              <TouchableOpacity onPress={handleLogin} style={styles.submitButton}>
                <Text style={styles.submitText}>submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.register}>Welcome to SKINBEA</Text>

        </View>
      </View>
    </View>

  )
}

export default LogIn
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  header: {
    backgroundColor: '#81d773',
    width: width,
    height: (60 / 932) * height,
    borderBottomRightRadius: 20 / 932 * height,
    borderBottomLeftRadius: 20 / 932 * height,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: width,
    height: 171 / 932 * height,
    // backgroundColor : 'red'
  },
  logoimg: {
    width: 230 / 430 * width,
    height: 101 / 932 * height,
    paddingTop: 35 / 932 * height,
    paddingBottom: 35 / 932 * height,

  },
  login: {
    width: 370 / 430 * width,
    height: 517 / 932 * height,
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: '#f6f4f4',
    borderRadius: 10,
  },
  windowlogin: {
    width: width,
    height: 580 / 932 * height,
    alignItems: 'center',
  },
  windowregister: {
    width: 370 / 430 * width,
    height: 70 / 932 * height,
    alignItems: 'center',
    alignContent: 'center',
    // backgroundColor : 'red'
  },
  register: {
    // fontFamily : 'Inria Serif',
    fontSize: 25,
    paddingTop: 20,
  },
  windowError: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  error: {
    width: 13 / 430 * width,
    height: 13 / 430 * width,
    // backgroundColor : 'black',
    marginRight: 10,
    marginLeft: 30,
  },
  text: {
    // fontFamily : 'Inria Serif',
    fontSize: 20,
    marginLeft: 20,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  inputText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: 310 / 430 * width,
    height: 50 / 932 * height,
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: '#f6f4f4',
    borderRadius: 10,
    marginLeft: 20,
    alignItems: 'center',
  },
  inputContent: {
    width: 250 / 430 * width,
    height: 50 / 932 * height,

    // backgroundColor : 'red'
    paddingLeft: 8,
    fontSize: 18,
    fontStyle: 'italic',
    paddingVertical: 5

  },
  inputContainer: {
    marginBottom: 20,
  },

  account: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  footer: {
    backgroundColor: '#81d773',
    width: width,
    height: 96 / 932 * height,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 25 / 932 * height,
    alignItems: 'center',
    alignContent: 'center'
  },

  submit: {
    width: 370 / 430 * width,
    height: 150 / 932 * height,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    width: 150 / 430 * width,
    height: 50 / 932 * height,
    backgroundColor: '#83f3ec',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  submitText: {
    color: 'white',
  },

  user: {
    width: 16 / 430 * width,
    height: 18 / 430 * width,
  }
});