import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Button, Image, ScrollView, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BeratKendaraan from './beratkendaraan'
import {BeratContext} from '../../../contexts/BeratContext'
import {KondisiKendaraan} from './kondisikendaraan'
import { cos } from 'react-native-reanimated';




const Tab = createMaterialTopTabNavigator();

export  function SecurityDetailScreen({route}) {

 const [DataBeratKendaraan, setDataBeratKendaraan]= useState(null)
 const [DataKondisiKendaraan, setDataKondisiKendaraan]= useState(null)


  const detail_data = {
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

// console.log(DataBeratKendaraan)

  const datar = React.useMemo(
    () => ({
      databerat: (Berat, NoteBerat, Photo) => {
        const All_BeratData = { Berat, NoteBerat, Photo }
        setDataBeratKendaraan(All_BeratData)
      },
      dataKondisi: (All_KondisiData) => {
        setDataKondisiKendaraan(All_KondisiData)
      },
      kirimData: () => {
        if (DataBeratKendaraan.Berat == null || DataBeratKendaraan.NoteBerat == null || DataBeratKendaraan.Photo == null) {
          console.log(DataBeratKendaraan)
          Alert.alert('Semua Data Berat Kendaraan Harus Di isi')
        } else {
          if (
            DataKondisiKendaraan.ImageMobil == null ||
            DataKondisiKendaraan.NoteBanSerap == null && DataKondisiKendaraan.isBanSerap == false ||
            DataKondisiKendaraan.NoteDongkrak == null && DataKondisiKendaraan.isDongkrak == false ||
            DataKondisiKendaraan.NoteRodaBan == null && DataKondisiKendaraan.isRodaBan == false) {
            Alert.alert('Semua Data Kondisi Kendaraan Harus Di isi')
          } else {
            Alert.alert('OKE')
          }
        }
      }
    }),
  );
  
  return (
    <BeratContext.Provider value={datar}>
      <Tab.Navigator >
        <Tab.Screen name="BeratKendaraan" >{() => (<BeratKendaraan data_detail={detail_data} />)}</Tab.Screen>
        <Tab.Screen name="KondisiKendaraan">{() => (<KondisiKendaraan data_detail={detail_data} />)}</Tab.Screen>
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