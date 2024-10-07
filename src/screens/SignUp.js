import React from 'react';
import {
  StyleSheet, Text, View, Dimensions, Image, TextInput, TouchableOpacity, KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native';
import { isValidEmail, isValidPassword } from '../utilies/Validations'
import { useState, useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "../config/firebase";
import firestore from '@react-native-firebase/firestore'

const { width, height } = Dimensions.get('screen')
const SignUp = ({ navigation }) => {

  const [keyboardIsShown, setKeyboardIsShown] = useState(false)
  //states for validating
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  //states to store email/password
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isValidationOK = () => email.length > 0 && password.length > 0
    && isValidEmail(email) == true
    && isValidPassword(password) == true

  const auth = getAuth();
  const createSignin = (email, password) => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Đăng nhập thành công
          const user = userCredential.user;
          resolve(user.email); // Trả về email của người dùng khi đăng nhập thành công
        })
        .catch((error) => {
          // Xử lý lỗi đăng nhập
          const errorCode = error.code;
          const errorMessage = error.message;
          reject(errorMessage); // Trả về thông báo lỗi nếu đăng nhập không thành công
        });
    });
  };

  const createUser = async () => {
    const doc = await firestore().collection('user').doc();

    let UId = doc.id
    doc.set({
      _id: UId,
      uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F18765757-user-profile-icon-in-flat-style-member-avatar-vector-illustration-on-isolated-background-human-permission-sign-business-concept&psig=AOvVaw2mcAqS7mvquVm7I6ygsNLw&ust=1713966844595000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNiKypu-2IUDFQAAAAAdAAAAABAE',
      name: 'null',
      dob: '01/01/2000',
      email: email,
      phone: 'null',
      address: 'null'
    })
    Alert.alert("success")
  }


  const ComfirmSignUp = async () => {
    try {
      const loggedInUserEmail = await createSignin(email, password);
      console.log("Đăng ký thành công với email:", loggedInUserEmail);
      createUser();
      // Alert.alert('Thông báo!', 'Đăng ký thành công', {text: 'OK', onPress: () => navigation.navigate("Login")});
      navigation.navigate("LogIn")
      // Thực hiện các hành động sau khi đăng nhập thành công, chẳng hạn như chuyển hướng người dùng đến trang khác
    } catch (error) {
      console.log("Thông tin đăng ký không hợp lệ:", error);
      // Xử lý trường hợp thông tin đăng nhập không chính xác
    }
  };

  useEffect(() => {
    //componentDidMount
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsShown(true)
    })
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsShown(false)
    })
  })

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
                Register
              </Text>
            </View>

            <View style={styles.windowError}>
              <Image style={styles.error} source={require('../img/error.png')} />
              <Text style={{ color: 'red', fontStyle: 'italic' }}>Password isn’t strong enough</Text>
            </View>

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

                    <TextInput placeholder="Your email" onChangeText={(text) => {
                      setErrorEmail(isValidEmail(text) == true ?
                        '' : 'Email not in correct format')
                      setEmail(text)
                    }}
                      keyboardType='email'
                      value={email} style={styles.inputContent} />
                  </View>

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

                    <TextInput placeholder="**********" onChangeText={(text) => {
                      setErrorPassword(isValidPassword(text) == true ?
                        '' : 'Password must be at least 3 characters')
                      setPassword(text)
                    }}
                      keyboardType='password'
                      value={password}
                      secureTextEntry={true} style={styles.inputContent} />
                  </View>

                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.text}>Accuracy:</Text>
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

                    <TextInput placeholder="***********" secureTextEntry={true} style={styles.inputContent} />
                  </View>

                </View>
              </View>
            </View>

            <View style={styles.account}>
              <Text style={{ fontStyle: 'italic' }}>You have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
                <Text style={{ color: '#9cdf91', fontStyle: 'italic', textDecorationLine: 'underline', marginLeft: 10 }}>Log In</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.submit}>
              <TouchableOpacity onPress={ComfirmSignUp}>
                <View style={styles.submitButton}>
                  <Text style={styles.submitText}>submit</Text>
                </View>
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

export default SignUp

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
    height: 580 / 932 * height,
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: '#f6f4f4',
    borderRadius: 10,
  },
  windowlogin: {
    width: width,
    height: 580 / 932 * height,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
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
    justifyContent: 'space-between'
  },
  input: {
    width: 310 / 430 * width,
    height: 50 / 932 * height,
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: '#f6f4f4',
    borderRadius: 10,
    marginLeft: 20
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
    alignContent: 'center',
    marginBottom: 12,
  },
  submitText: {
    color: 'white',
  },

  user: {
    width: 16 / 430 * width,
    height: 18 / 430 * width,
  }
});