import { View, Text, StyleSheet, ImageBackground, Image, Dimensions, Animated, Easing } from 'react-native'
import React, { useEffect, useState, useRef } from 'react';
import ScreenTransition from '../animations/TopToBottom'
const { width, height } = Dimensions.get('screen')
const Loading = () => {

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigation.navigate("MyTab");
  //   }, []); // Thời gian chờ trước khi chuyển đến màn hình Home (đơn vị: milliseconds)
    
  //   return () => clearTimeout(timer); // Xóa timer khi component unmounts
  // }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.ImageBackground} source={require('../img/welcome1.png')}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../img/logo1.png')} />
          <Text style={styles.logoText}>Welcome to Make Beauty</Text>
          <ScreenTransition />
        </View>
      </ImageBackground>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 100,
  },
  ImageBackground: {
    width: width,
    height: height,
    position: 'absolute',

  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 266,
    height: 146,
  },
  logoText: {
    fontSize: 24,
    color: '#6d806b',

  },
});