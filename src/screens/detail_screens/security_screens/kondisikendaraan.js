import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button, Image, Alert, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { RNCamera, FaceDetector } from 'react-native-camera';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Icon } from 'react-native-elements'
import {BeratContext} from '../../../contexts/BeratContext'
import { SafeAreaView } from 'react-native-safe-area-context';


export function KondisiKendaraan({ data_detail }) {

  const {dataKondisi} = useContext(BeratContext)
  const [KondisiKendaraan, setKondisiKendaraan] = useState()
  const [RadioButton, setradioButton] = useState()
  const [Note, setNote] = useState()
  const [camera, setCamera] = useState();
  const [ImageMobil, setImageMobil] = useState()
  const [tmpItem, settmpItem] = useState()
  const [openCamera, setopenCamera] = useState(false);

  useEffect(() => {
    // const All_DataKondisi = {isDongkrak, isRodaBan, isBanSerap, NoteDongkrak, NoteRodaBan, NoteBanSerap, ImageMobil}
    // dataKondisi(All_DataKondisi)
    dataKondisi(KondisiKendaraan)
  }, [KondisiKendaraan, Note, RadioButton, ImageMobil])


  useEffect(() => {
    SetItem()
  }, [])

  async function SetItem() {
    await data_detail.kelengkapan.map(data => {
      data.status = "true";
      data.note = undefined;
      data.image = undefined;
    })
    await setKondisiKendaraan(data_detail.kelengkapan)

  }




  function listEmptyComponent() {
    return (
      <View>
        <Text>No Data Found</Text>
        <TouchableOpacity
          onPress={async () => {
            try {
              await setLoading(true)
              await firstLoad()
            } catch {
              Alert.alert('Error, Coba lagi !')
            }
          }}>
          <Icon
            size={50}
            name='refresh-circle'
            type='ionicon'
            color='green'
          />
        </TouchableOpacity>
      </View>
    )
  }


  
  function showCamera() {

    async function takePicture() {
      if (camera) {
        try {
          const options = { quality: 0.5, base64: true };
          const data = await camera.takePictureAsync(options);
          // await setImageMobil('data:image/png;base64,' + data.base64)          
         
          await KondisiKendaraan.map(dataKondisi => {

            if (dataKondisi.code == tmpItem) {
              dataKondisi.image = ('data:image/png;base64,' + data.base64)    
            }
          })
        } catch {
          Alert.alert('Terjadi kesalahan ! Silahkan mengulangi')
        } finally {
          await setopenCamera(false)
        }
      }
    };

    return (
      <Modal isVisible={openCamera}>
        <View style={{ flex: 1 }}>
          <RNCamera
            ref={ref => {
              setCamera(ref);
            }}
            style={{ flex: 1 }}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          />
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-evenly', padding: 5 }}>
            <Button
              onPress={() => { setopenCamera(false)}}
              title={'Keluar'}
            />
            <Button
              onPress={takePicture.bind(this)}
              title={'Ambil'}
            />
          </View>
        </View>
      </Modal>
    )
  }

  function showPicture() {
    if (ImageMobil == null) {
      return (null)
    }
    return (
      <View style={{ width: 150, height: 200, flex: 1, borderWidth: 1, borderColor: 'grey', alignSelf: 'center' }}>
        <Image accessible={false} style={{ flex: 1 }} source={{ uri: ImageMobil }} />
      </View>
    )
  }

  var radio_props = [
    { label: 'Sesuai  ', value: true },
    { label: 'Tidak Sesuai', value: false }
  ];

  const Header = () => {
    return  <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Kondisi Kendaraan</Text>
};

  const Footer = () => {
    return (
      <View style={{paddingBottom:50}}>
        {/* {showPicture()}
        <TouchableOpacity
          style={{ backgroundColor: '#1f94c2', margin: 10, padding: 10,  borderRadius: 10, alignSelf: 'center' }}
          onPress={() => { setopenCamera(true) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon style={{ marginHorizontal: 8 }} size={30} name='md-camera' type='ionicon' color='white' />
            <Text style={{ marginHorizontal: 8 }}>Ambil Gambar Mobil</Text>
          </View>
        </TouchableOpacity> */}
      </View>);
  };
  return (
    <SafeAreaView>
      <View style={{}}>
        <FlatList
          style={{ padding: 20 }}
          ListHeaderComponent={Header}
          ListFooterComponent={Footer}
          ListEmptyComponent={listEmptyComponent}
          data={KondisiKendaraan}
          keyExtractor={({ nama }, index) => nama}
          renderItem={({ item }) => (

            <View style={{ padding: 10 }}>
              <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'space-evenly' }}>
                <Text style={{ fontSize: 15 }}>{item.nama} </Text>
                <Text style={{ padding: 2, backgroundColor: '#bcffa3', paddingHorizontal: 8, marginLeft: 20 }}> {item.jumlah} </Text>
              </View>
              <RadioForm
                style={{ padding: 10 }}
                animation={true}
                radio_props={radio_props}
                formHorizontal={true}
                onPress={async (value) => {
                  item.status = value
                  setradioButton(value)
                }} />
              <View style={{ width: '100%' }}>
                <TextInput
                  style={styles.InputNote}
                  editable={true}
                  multiline
                  numberOfLines={4}
                  placeholder={'Tulis Catatan..'}
                  onChangeText={(val) => {
                    item.note = val
                    setNote(val)
                  }} />

                <TouchableOpacity
                  style={{ backgroundColor: '#1f94c2', margin: 10, padding: 10, borderRadius: 10, alignSelf: 'center' }}
                  onPress={async () => {
                    try {
                      await settmpItem(item.code)
                      await showCamera()
                      await setopenCamera(true)
                    } catch (error) {
                      Alert.alert(error)
                    }
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon style={{ marginHorizontal: 8 }} size={30} name='md-camera' type='ionicon' color='white' />
                    <Text style={{ marginHorizontal: 8 }}>Ambil Gambar</Text>
                  </View>
                </TouchableOpacity>


                {showHide(item)}


                <Text style={{ color: 'red', borderBottomWidth: 1, paddingBottom:20 }}>*Harus Masukkan Alasan dan Gambar Jika Tidak Sesuai</Text>
              </View>
            </View>
          )} />

        {showCamera()}
      </View>
    </SafeAreaView>

  );
}


function showHide(item) {
  if (item.image !== undefined) {
        return (
          <View style={{ width: 150, height: 200, flex: 1, borderWidth: 1, borderColor: 'grey', alignSelf: 'center' }}>
            <Image accessible={false} style={{ flex: 1 }} source={{ uri: item.image }} isVisible={false} />
          </View>
        )
      } else {
        return null
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
