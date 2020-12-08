import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button, Image, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { RNCamera, FaceDetector } from 'react-native-camera';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Icon } from 'react-native-elements'
import {BeratContext} from '../../../contexts/BeratContext'


export function KondisiKendaraan({ data_detail }) {

  const {dataKondisi} = useContext(BeratContext)
  const [isDongkrak, setisDongkrak] = useState()
  const [isRodaBan, setisRodaBan] = useState()
  const [isBanSerap, setisBanSerap] = useState()
  const [NoteDongkrak, setNoteDongkrak] = useState(null)
  const [NoteRodaBan, setNoteRodaBan] = useState(null)
  const [NoteBanSerap, setNoteBanSerap] = useState(null)
  const [camera, setCamera] = useState();
  const [ImageMobil, setImageMobil] = useState()
  const [openCamera, setopenCamera] = useState(false);

  useEffect(() => {
    const All_DataKondisi = {isDongkrak, isRodaBan, isBanSerap, NoteDongkrak, NoteRodaBan, NoteBanSerap, ImageMobil}
    dataKondisi(All_DataKondisi)
  },
   [isDongkrak,isRodaBan,isBanSerap,NoteDongkrak,NoteRodaBan,NoteBanSerap,ImageMobil]
   )




  function isDongrakFalse() {
    // console.log('Dongkrak :' + isDongkrak)
    if (isDongkrak == false) {
      return (<View style={{ width: '100%' }}>
        <TextInput
          style={styles.InputNote}
          editable={true}
          multiline
          numberOfLines={4}
          placeholder={'Tulis Catatan Dongkrak ....'}
          value={NoteDongkrak}
          onChangeText={setNoteDongkrak} />
        <Text style={{ color: 'red' }}>*Masukkan Alasan</Text>
      </View>)
    }
  }

  function isRodaBanFalse() {
    // console.log('RodaBan :' + isRodaBan)
    if (isRodaBan == false) {
      return (<View style={{ width: '100%' }}>
        <TextInput
          style={styles.InputNote}
          editable={true}
          multiline
          numberOfLines={4}
          placeholder={'Tulis Catatan Roda Ban ....'}
          value={NoteRodaBan}
          onChangeText={setNoteRodaBan} />
        <Text style={{ color: 'red' }}>*Masukkan Alasan</Text>
      </View>)
    }
  }

  function isBanSerapFalse() {
    // console.log('Ban Serap :' + isBanSerap)
    if (isBanSerap == false) {
      return (<View style={{ width: '100%' }}>
        <TextInput
          style={styles.InputNote}
          editable={true}
          multiline
          numberOfLines={4}
          placeholder={'Tulis Catatan Ban Serap ....'}
          value={NoteBanSerap}
          onChangeText={setNoteBanSerap} />
        <Text style={{ color: 'red' }}>*Masukkan Alasan</Text>
      </View>)
    }
  }



  function showCamera() {
    async function takePicture() {
      if (camera) {
        try {
          const options = { quality: 0.5, base64: true };
          const data = await camera.takePictureAsync(options);
          await setImageMobil('data:image/png;base64,' + data.base64)
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
              onPress={() => { setopenCamera(false) }}
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
    { label: 'Ya  ', value: true },
    { label: 'Tidak', value: false }
  ];
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ alignContent: 'center' }}>
      <View style={{ alignContent: 'center', margin: 30 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Kondisi Kendaraan</Text>

        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'space-evenly' }}>
            <Text style={{ fontSize: 15 }}>Jumlah Dongkrak : </Text>
            <Text style={{ padding: 2, backgroundColor: '#bcffa3', paddingHorizontal: 8, }}> {data_detail.jumlah_dongkrak} </Text>
          </View>
          <RadioForm
            style={{ padding: 10 }}
            animation={true}
            radio_props={radio_props}
            formHorizontal={true}
            onPress={async (value) => {
              setisDongkrak(value)
            }} />
          {isDongrakFalse()}
        </View>


        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'space-evenly' }}>
            <Text style={{ fontSize: 15 }}>Jumlah Roda Ban : </Text>
            <View style={{ padding: 2, backgroundColor: '#bcffa3', paddingHorizontal: 8, }}><Text> {data_detail.jumlah_roda_ban} </Text></View>
          </View>
          <RadioForm

            style={{ padding: 10 }}
            animation={true}
            radio_props={radio_props}
            formHorizontal={true}
            onPress={async (value) => {
              setisRodaBan(value)
            }} />
          {isRodaBanFalse()}
        </View>

        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'space-evenly' }}>
            <Text style={{ fontSize: 15 }}>Jumlah Ban Serap : </Text>
            <View style={{ padding: 2, backgroundColor: '#bcffa3', paddingHorizontal: 8, }}><Text> {data_detail.jumlah_roda_ban_serap} </Text></View>
          </View>
          <RadioForm
            style={{ padding: 10 }}
            animation={true}
            radio_props={radio_props}
            formHorizontal={true}
            onPress={async (value) => {
              setisBanSerap(value)
            }} />
          {isBanSerapFalse()}
        </View>

        {showPicture()}
        <TouchableOpacity
          style={{ backgroundColor: '#1f94c2', margin: 10, padding: 10, borderRadius: 10, alignSelf: 'center' }}
          onPress={() => { setopenCamera(true) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon style={{ marginHorizontal: 8 }} size={30} name='md-camera' type='ionicon' color='white' />
            <Text style={{ marginHorizontal: 8 }}>Ambil Gambar Mobil</Text>
          </View>
        </TouchableOpacity>


        {showCamera()}
      </View>
    </ScrollView>
  );
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