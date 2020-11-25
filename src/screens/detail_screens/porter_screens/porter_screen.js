import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Button, Image, ScrollView, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {ListBarang} from './ListBarang'
import {BeratContext} from '../../../contexts/BeratContext'
import {DetailKendaraan} from './DetailKendaraan'




const Tab = createMaterialTopTabNavigator();

export function PorterDetailScreen({ route }) {

  const detail_dataPorter = {
    doc_id: route.params.ID_Number,
    nama_supir: 'Janurdin',
    No_Plat: 'B 3244 NO',
    tanggal: '24/10/2020',
    pukul: '09:12',
    vendor: 'PT. Kesatria',
    status: 'security1',
    jumlah_dongkrak: 2,
    jumlah_roda_ban: 6,
    jumlah_roda_ban_serap: 2,
    kendaraan: 'Mitshubishi Colt Diesel'
  }

  const datar = React.useMemo(
    () => ({

    }),
  );

  return (
    <BeratContext.Provider value={datar}>
      <Tab.Navigator >
        <Tab.Screen name="ListBarang" >{() => (<ListBarang data_detail={detail_dataPorter} />)}</Tab.Screen>
        <Tab.Screen name="DetailKendaraan">{() => (<DetailKendaraan data_detail={detail_dataPorter} />)}</Tab.Screen>
      </Tab.Navigator>
    </BeratContext.Provider>
  );
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