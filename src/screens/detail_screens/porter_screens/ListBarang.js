import React, { useState, useContext, createContext, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Button, Image, ScrollView, Alert,FlatList } from 'react-native';
import { RNCamera, FaceDetector } from 'react-native-camera';
import { BeratContext } from '../../../contexts/BeratContext'
import Modal from 'react-native-modal';
import { Icon } from 'react-native-elements'

export function ListBarang({ data_detail, navigation }) {

  const data_listBarang = [
    {
      "Loading_Tahap": 1,
      "LoadDock": "Dock Timur 003",
      "Item": [{
        "nama": "besi konstruksi H-Beam",
        "jumlah": "200 Batang"
      }, {
        "nama": "besi siku",
        "jumlah": "150 Batang"
      }],
      "status": 0
    }, {
      "Loading_Tahap": 2,
      "LoadDock": "Dock Barat 001",
      "Item": [{
        "nama": "Beras",
        "jumlah": "24 Karung"
      }, {
        "nama": "Gula",
        "jumlah": "10 Karung"
      }],
      "status": 1
    }, {
      "Loading_Tahap": 3,
      "LoadDock": "Dock Selatan 006",
      "Item": [{
        "nama": "Seng Plat",
        "jumlah": "200 Lembar"
      }, {
        "nama": "Paku",
        "jumlah": "150 Dus"
      }],
      "status": 0
    }
  ]

function listBarang(itemData){
  if (itemData.status == 0){
    return(
      <View style={{ padding: 10, margin: 10, backgroundColor: 'grey' }}>
      <Text>Tahap {itemData.Loading_Tahap}  -- {itemData.LoadDock}</Text>
    </View>)
  }else{
    return(
      <View style={{margin:10}}>
      <View style={{ padding: 10, backgroundColor: '#1f94c2' }}>
      <Text>Tahap {itemData.Loading_Tahap}  -- {itemData.LoadDock}</Text>
      
    </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={itemData.Item}
        keyExtractor={({ nama }, index) => nama}
        renderItem={({ item }) => (
          <View style={{ padding: 10, backgroundColor: 'yellow' }}>
            {console.log('Item' + item)}
            <Text> {item.nama}</Text>
          </View>
        )} />
        </View>
    )
  }
}
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data_listBarang}
        keyExtractor={({ Loading_Tahap }, index) => Loading_Tahap}
        renderItem={({ item }) => (
          listBarang(item)
        )} />
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