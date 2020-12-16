import React from 'react';
import { View, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';

export function SplashScreen() {
  const { colors } = useTheme();
  return <ImageBackground source={require('../components/img/splashscreen.jpg')} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    height: "120%",
    width: '100%',
    justifyContent: "center"
  },
});
