import React, { useState, useContext, useEffect, Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableWithoutFeedback, Dimensions, Alert, Linking, Button } from 'react-native';
import SecureStorage from '@react-native-community/async-storage';
import { BASE_URL} from '../../config/index';
import { AuthContext } from '../../contexts/AuthContext';
import { Loading } from '../../components/Loading';
import { AuthContainer } from '../../components/AuthContainer'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements'
import Modal from 'react-native-modal';

export  function HomeScreen({ navigation }) {
    return(
        <View>
            <Text>Porter</Text>
        </View>
    )
}


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
  cardBox: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 300,
    // shadowColor:'black',
    // shadowOpacity:0.1,
    // shadowRadius:2,
    // shadowOffset:{
    //   width:0,
    //   height:2
    // },
    elevation: 5
  },
  header: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f94c2',
    height: 50,
    padding: 10,
    marginTop: -20,
    justifyContent: 'space-between'
  }
})