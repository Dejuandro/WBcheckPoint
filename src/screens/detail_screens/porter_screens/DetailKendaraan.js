import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button, Image, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { RNCamera, FaceDetector } from 'react-native-camera';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Icon } from 'react-native-elements'
import { BeratContext } from '../../../contexts/BeratContext'

export function DetailKendaraan({ data_detail }) {
  return (
    <View>
      <Text>
        Detail Kendaraan
  </Text>
    </View>
  )
}

const styles = StyleSheet.create({

  InputNote: {
    margin: 5,
    width: '90%',
    backgroundColor: '#e6e6e6',
    borderWidth: 0.5,
    borderRadius: 10
  }

})
