import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button, Image, Alert,FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { RNCamera, FaceDetector } from 'react-native-camera';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Icon } from 'react-native-elements'
import { PorterContext } from '../../../contexts/PorterContext'

export function DetailKendaraan({ data_detail }) {

  const { kirimData } = useContext(PorterContext)
  
  // useEffect(() => {
  //   kirimData()
  // },
  //   []
  // )

  function listEmpty() {
    return (
      <View style={{}}>
        <Text>Kosong</Text>
      </View>
    )
  }

  function dockType(dockType) {
    if (dockType == 'Unloading_Dock') {
      return (
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>UNLOADING BARANG</Text>
          <Text style={{fontSize:12, color:'red'}}>*Harap Melakukan Cek Ulang Untuk Barang Yang di UNLOADING</Text>
        </View>
      )
    } else {
      if (dockType == 'Loading_Dock') {
        return (
          <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>LOADING BARANG</Text>
          <Text style={{fontSize:12, color:'red'}}>*Harap Melakukan Cek Ulang Untuk Barang Yang di LOADING</Text>
          </View>
        )
      } else {
        return (
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tipe Tidak Ditemukan</Text>)
      }
    }
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>

    <View style={{ backgroundColor: 'white', elevation: 10, padding: 10, borderRadius: 10 }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginLeft: 15
      }}>
        <Text style={{ flexWrap: 'wrap', fontWeight: 'bold', fontSize: 20 }} numberOfLines={1}>{data_detail.Data.No_Plat}</Text>
        <Text style={{ flexWrap: 'wrap', fontWeight: 'bold', fontSize: 15 }}>{data_detail.Data.id_transaksi}</Text>
      </View>


      <View style={{ alignItems: 'center', alignSelf: 'flex-start', marginVertical: 4, marginLeft: 15 }}>
        <Text>{data_detail.Data.tanggal}  {data_detail.Data.pukul}</Text>
      </View>

      <View style={{ alignItems: 'center', alignSelf: 'flex-start', alignItems: 'flex-start', marginLeft: 15 }}>
        <Text style={{ fontSize: 16 }}>Kendaraan : {data_detail.Data.kendaraan}</Text>
        <Text style={{ fontSize: 16 }}>Vendor : {data_detail.Data.vendor}</Text>
        <Text style={{ fontSize: 16 }}>Supir : {data_detail.Data.nama_supir}</Text>
        <View style={{marginTop:10}}>{dockType(data_detail.Data.docType)}</View>
      </View>
    </View>

    <View style={{ backgroundColor: 'white', elevation: 10, padding: 10, borderRadius: 10, marginTop: 15, }}>
      <FlatList
        style={{ marginLeft: 15 }}
        ListEmptyComponent={listEmpty()}
        ListHeaderComponent={<Text style={{ fontWeight: 'bold', fontSize: 20 }}>List Dock Transaksi</Text>}
        showsVerticalScrollIndicator={false}
          data={data_detail.Data.DockList}
          keyExtractor={({ DockCode }, index) => DockCode}
          renderItem={({ item }) => (

            <View style={{ flexDirection: 'row', paddingHorizontal: 10, padding: 5, alignItems: 'center', alignSelf: 'flex-start', justifyContent: 'space-between', width: '100%' }}>

              <Text style={{ fontWeight: 'bold' }}>{item.DockCode}</Text>
              {Proses(item.DockStatus)}
              {IconProses(item.DockStatus)}
              {/* {item.DockStatus ?
              <Text>Proses</Text> :
              <Text>Selesai</Text>}
            {item.DockStatus ?
              <Icon
                size={20}
                name='md-logo-flickr'
                type='ionicon'
                color='#1f94c2'
                onPress={() => { setimageView(false) }}
              />
              : <Icon
                size={20}
                name='md-checkmark-circle'
                type='ionicon'
                color='green'
                onPress={() => { setimageView(false) }}
              />} */}
            </View>
          )} />
      </View>
    <View style={{ marginTop: 25 }} >
      <Button title={'Submit'} onPress={()=>{kirimData()}} />
      <Text style={{ color: 'red', marginTop: 10 }}>*Pastikan semua data terisi dengan benar</Text>
    </View>
  </View>
  )
}

function Proses(dockStatus) {
  if (dockStatus == 'false') {
    return <Text> Proses</Text>
  } else {
    return <Text>Selesai </Text>
  }
}

function IconProses(dockStatus) {
  if (dockStatus == 'false') {
    return <Icon
      size={20}
      name='md-logo-flickr'
      type='ionicon'
      color='#1f94c2'
      onPress={() => { setimageView(false) }}
    />
  } else {
    return <Icon
      size={20}
      name='md-checkmark-circle'
      type='ionicon'
      color='green'
      onPress={() => { setimageView(false) }}
    />
  }
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

// [{"DockCode": "DOCK001", "DockName": "-", "DockStatus": "true"}, 
// {"DockCode": "DOCK002", "DockName": "-", "DockStatus": "true"}]


// { "Data": { "DockList": [[Object], [Object]], "Item": [[Object], [Object], [Object], [Object]], "No_Plat": "B 1 SA", "id_transaksi": "REG07122020104122", "nama_supir": "KARSONO", "pukul": "17:00", "status": "Dock", "tanggal": "12/9/20, 5:00 PM", "vendor": "PT ABC TRANSPORT" }, "dockCode": "DOCK001", "message": "Success", "status": "200" }
