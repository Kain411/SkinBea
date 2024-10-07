import React from 'react';
import { Animated, Easing, ImageBackground, Text, View } from 'react-native';

export default class ScreenTransition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    const up = Animated.timing(
      this.state.anim,
      {
        toValue: 1,
        duration: 1000,
        // easing: Easing.cubic,
        useNativeDriver: true,
      }
    )
    const down = Animated.timing(
      this.state.anim,
      {
        toValue: 0,
        duration: 1000,
        // easing: Easing.cubic,
        useNativeDriver: true,
      }
    )
    const lap = Animated.sequence([up, down])
    Animated.loop(lap).start();
  }

  render() {
    const translateY = this.state.anim.interpolate({
      inputRange: [0, 1],
      outputRange: [10, 7],
    });
    const translateYD = this.state.anim.interpolate({
      inputRange: [0, 1],
      outputRange: [7, 4],
    });
    const translateYT = this.state.anim.interpolate({
      inputRange: [0, 1],
      outputRange: [4, 1],
    });
    const translateYZ = this.state.anim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 4],
    });
    return (
      <View style={{flexDirection:'row'}}>
        <Animated.View style={{ transform: [{ translateY: translateY }] }}>
          <Text style={{ color: 'red', fontSize: 40 }}>L</Text>
        </Animated.View>
        <Animated.View style={{ transform: [{ translateY: translateYD }] }}>
          <Text style={{ color: 'red', fontSize: 40 }}>o</Text>
        </Animated.View>
        <Animated.View style={{ transform: [{ translateY: translateYT }] }}>
          <Text style={{ color: 'red', fontSize: 40 }}>a</Text>
        </Animated.View>
        <Animated.View style={{ transform: [{ translateY: translateYZ }] }}>
          <Text style={{ color: 'red', fontSize: 40 }}>d</Text>
        </Animated.View>
        <Animated.View style={{ transform: [{ translateY: translateYZ }] }}>
          <Text style={{ color: 'red', fontSize: 40 }}>i</Text>
        </Animated.View>
        <Animated.View style={{ transform: [{ translateY: translateYT }] }}>
          <Text style={{ color: 'red', fontSize: 40 }}>n</Text>
        </Animated.View>
        <Animated.View style={{ transform: [{ translateY: translateYD }] }}>
          <Text style={{ color: 'red', fontSize: 40 }}>g</Text>
        </Animated.View>
        <Animated.View style={{ transform: [{ translateY: translateYD }] }}>
          <Text style={{ color: 'red', fontSize: 40 }}>.</Text>
        </Animated.View>
        <Animated.View style={{ transform: [{ translateY: translateYT }] }}>
          <Text style={{ color: 'red', fontSize: 40 }}>.</Text>
        </Animated.View>
        <Animated.View style={{ transform: [{ translateY: translateYZ }] }}>
          <Text style={{ color: 'red', fontSize: 40 }}>.</Text>
        </Animated.View>
      </View>
    );
  }
}