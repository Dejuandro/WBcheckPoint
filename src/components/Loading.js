import React from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import FastImage from "react-native-fast-image";

export function Loading({loading}) {
  if (!loading) {
    return <View />;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        {/* <AwesomeLoading indicatorId={2} size={50} text='Loading...' isActive={true}/> */}
        <FastImage
            style={{ width: 50, height: 50 }}
            source={require("../components/indicators/indicator18.gif")}
            resizeMode={FastImage.resizeMode.contain}
          />
        <Text style={styles.text}>Loading..</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'white',
    // flexDirection: 'row',
    alignItems:'center',
    padding: 40,
    paddingVertical:15,
    borderRadius: 8,
  },
  text: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: '500',
  }
});
