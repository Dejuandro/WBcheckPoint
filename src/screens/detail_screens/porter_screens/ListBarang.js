import React, { useState, useContext, createContext, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Button, Image, ScrollView, Alert, FlatList } from 'react-native';
import { RNCamera, FaceDetector } from 'react-native-camera';
import { BeratContext } from '../../../contexts/BeratContext'
import Modal from 'react-native-modal';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Icon } from 'react-native-elements'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export function ListBarang({ data_detail, navigation }) {

  const [isColapse, setisColapse] = useState(false)
  const [StatusItem, setStatusItem] = useState()
  const [DataBarang, setDataBarang] = useState()
  const [Note, setNote] = useState()
  var radio_props = [
    { label: 'Sesuai  ', value: true },
    { label: 'Tidak Sesuai', value: false }
  ];

  useEffect(() => {
    SetItem()

  },
    [isColapse]
  )

 async function SetItem() {
    data_listBarang.map(async DataLooping => {
      if(DataLooping.status == 1){
      await   DataLooping.Item.map(data=>{
          data.kelengkapan = "true"
        })
      await  setDataBarang(DataLooping.Item)
      }else{
      }
    })
  }

  const data_listBarang = [
    {
      "status": "200",
      "message": "sukses",
      "Data": [
        {
          "id_transaksi": "ID322",
          "nama_supir": "Janurdin",
          "No_Plat": "B 3244 NO",
          "tanggal": "24/10/2020",
          "pukul": "'09:12'",
          "vendor": "PT. Kesatria",
          "status": "security1",
          "kelengkapan": [
            {
              "nama": "Dongkrak",
              "jumlah": "2"
            }, {
              "nama": "Roda Ban",
              "jumlah": "6"
            }, {
              "nama": "Dongkrak",
              "jumlah": "2"
            }
          ]


        }
      ]
    }
  ]

  function isStatusFalse() {
    // console.log('Dongkrak :' + isDongkrak)
    if (StatusItem == false) {
      return (<View style={{ width: '100%' }}>
        <TextInput
          style={styles.InputNote}
          editable={true}
          multiline
          numberOfLines={4}
          placeholder={'Tulis Catatan Dongkrak ....'}
          value={Note}
          onChangeText={setNote} />
        <Text style={{ color: 'red' }}>*Masukkan Alasan</Text>
      </View>)
    }
  }

  function listBarang(itemData) {
    if (itemData.status == "0") {
      return (
        <View style={{ padding: 10, margin: 15, backgroundColor: 'white', borderRadius: 10, elevation: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Tahap {itemData.Loading_Tahap}  -- {itemData.LoadDock}</Text>
          <Icon
            size={30}
            name='close-circle'
            type='ionicon'
            color='black'
          />
        </View>)
    } else {
      if (itemData.status == "1") {
        return (
          <View style={{ margin: 15, elevation: 10 }}>
            <TouchableWithoutFeedback onPress={() => {
              if (isColapse == true) {
                setisColapse(false)
              } else {
                setisColapse(true)
              }
            }}>
              <View style={{ padding: 10, backgroundColor: '#1f94c2', borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 15 }}>Tahap {itemData.Loading_Tahap}  -- {itemData.LoadDock}</Text>
                {isColapse ? <Icon
                  size={30}
                  name='arrow-down-circle'
                  type='ionicon'
                  color='white'
                /> : <Icon
                    size={30}
                    name='arrow-up-circle'
                    type='ionicon'
                    color='white'
                  />}
              </View>
            </TouchableWithoutFeedback>
            {isColapse ? <View /> :
              <View style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: -10, padding: 10, paddingTop: 20, zIndex: -999, backgroundColor: 'white', elevation:10 }}>
                <FlatList
                  isVisible={false}
                  showsVerticalScrollIndicator={false}
                  data={DataBarang}
                  keyExtractor={({ nama }, index) => nama}
                  renderItem={({ item }) => (
                    <View style={{ padding: 8, marginVertical:20 }}>
                      <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'space-evenly'}}>
                      <Text style={{ fontSize: 15 }}>{item.nama} </Text>
                      <Text style={{ padding: 2, backgroundColor: '#bcffa3', borderWidth: 0.5, paddingHorizontal: 8, marginLeft: 10 }}> {item.jumlah} </Text>
                    </View>
                      <RadioForm
                        style={{ padding: 10 }}
                        
                        animation={true}
                        radio_props={radio_props}
                        formHorizontal={true}
                        onPress={async (value) => {
                          item.kelengkapan= JSON.stringify(value)
                        }} />
                      <TextInput
                        style={styles.InputNote}
                        editable={true}
                        multiline
                        numberOfLines={4}
                        placeholder={'Tulis Catatan'}
                        onChangeText={(Note)=>{item.catatan = Note}} />
                      <Text style={{ color: 'red' }}>*Masukkan Catatan</Text>
                      { item.kelengkapan? isStatusFalse() : <View/>}
                    </View>
                  )} />
                  <Button title={'Submit'} onPress={()=>{
                    DataBarang.map(data=>{
                      console.log(data)
                    })
                  }}/>
              </View>}
          </View>
        )
      } else {
        return (
          <View style={{ padding: 10, margin: 15, backgroundColor: '#0ed900', borderRadius: 10, elevation: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Tahap {itemData.Loading_Tahap}  -- {itemData.LoadDock}</Text>
            <Icon
              size={30}
              name='checkmark-done-circle'
              type='ionicon'
              color='white'
            />
          </View>)
      }
    }
  }
  return (
    <View >
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
  },
  InputNote: {
    margin: 5,
    width: '90%',
    backgroundColor: '#e6e6e6',
    borderWidth: 0.5,
    borderRadius: 10
  }
})