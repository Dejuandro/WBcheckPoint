import React, { useState, useContext, createContext, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Button, Image, ScrollView, Alert } from 'react-native';
import { RNCamera, FaceDetector } from 'react-native-camera';
import { BeratContext } from '../../../contexts/BeratContext'
import Modal from 'react-native-modal';
import { Icon } from 'react-native-elements'

export function ListBarang({ data_detail, navigation }) {
  return (
    <View>
      <Text>List Barang</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  TextInput: {
    margin: 5,
    backgroundColor: '#e6e6e6',
    borderWidth: 0.5,
    borderRadius: 10,
    width: '40%',
    textAlign: 'center',
    flexWrap: 'wrap'
  },
  TextInputNote: {
    margin: 5,
    width: 250,
    backgroundColor: '#e6e6e6',
    borderWidth: 0.5,
    borderRadius: 10
  }
})
