import React, { useState, useContext, createContext, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Button, Image, ScrollView, Alert } from 'react-native';
import { RNCamera, FaceDetector } from 'react-native-camera';
import { BeratContext } from '../../../contexts/BeratContext'
import Modal from 'react-native-modal';
import { Icon } from 'react-native-elements'


function BeratKendaraan({ data_detail, navigation }) {


  const { databerat } = useContext(BeratContext)
  const { kirimData } = useContext(BeratContext)
  const [camera, setCamera] = useState();
  const [openCamera, setopenCamera] = useState(false);
  const [ImageBerat, setImageBerat] = useState()
  const [Berat, setBerat] = useState()
  const [NoteBerat, setNoteBerat] = useState()

  useEffect(() => {
    databerat(Berat, NoteBerat, ImageBerat)
  },
    [Berat, NoteBerat, ImageBerat]
  )

  function showCamera() {
    async function takePicture() {
      if (camera) {
        try {
          const options = { quality: 0.5, base64: true };
          const data = await camera.takePictureAsync(options);
          await setImageBerat('data:image/png;base64,' + data.base64)
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
    if (ImageBerat == null) {
      return (null)
    }
    return (
      <View style={{ width: 150, height: 200, borderWidth: 1, borderColor: 'grey' }}>
        <Image accessible={false} style={{ flex: 1 }} source={{ uri: ImageBerat }} />
      </View>
    )
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '90%',
          alignSelf: 'flex-start',
          alignItems:'center'
        }}>
          <Text style={{ flexWrap: 'wrap', fontWeight: 'bold', fontSize: 20 }} numberOfLines={1}>No. Plat : {data_detail.No_Plat}</Text>
          <Text style={{ flexWrap: 'wrap', fontWeight: 'bold', fontSize: 15 }}>{data_detail.id_transaksi}</Text>
        </View>


        <View style={{ alignItems: 'center', alignSelf: 'flex-start', marginVertical: 4, marginLeft: 15 }}>
          <Text>{data_detail.tanggal}  {data_detail.pukul}</Text>
        </View>

        <View style={{ alignItems: 'center', alignSelf: 'flex-start', alignItems: 'flex-start', marginLeft: 15 }}>
          <Text style={{ fontSize: 16 }}>Kendaraan : {data_detail.kendaraan}</Text>
          <Text style={{ fontSize: 16 }}>Vendor : {data_detail.vendor}</Text>
          <Text style={{ fontSize: 16 }}>Supir : {data_detail.nama_supir}</Text>
        </View>

        <View style={{ alignItems: 'center', alignSelf: 'flex-start', alignItems: 'flex-start' }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 30 }}>Berat Kendaraan</Text>
        </View>


        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '80%',
          alignSelf: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: 16 }}>Berat :</Text>
          <TextInput style={styles.TextInput} placeholder={'Kilogram'} editable={true} keyboardType={"numeric"} value={Berat} onChangeText={setBerat} />
        </View>

        <View style={{ alignItems: 'flex-start' }}>
          <View style={styles.TextInputNote}>
            <TextInput
              style={{ alignContent: 'flex-end' }}
              editable={true}
              multiline
              numberOfLines={4}
              placeholder={'Tulis Catatan Berat ....'}
              value={NoteBerat}
              onChangeText={setNoteBerat} />
          </View>
        </View>
        {showCamera()}
        {showPicture()}

        <TouchableOpacity
          style={{ backgroundColor: '#1f94c2', margin: 10, flex: 1, padding: 10, borderRadius: 10 }}
          onPress={() => { setopenCamera(true) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon style={{ marginHorizontal: 8 }} size={30} name='md-camera' type='ionicon' color='white' />
            <Text style={{ marginHorizontal: 8 }}>Ambil Gambar</Text>
          </View>
        </TouchableOpacity>


        <TouchableOpacity
          style={{ backgroundColor: '#1f94c2', margin: 10, flex: 1, padding: 10, borderRadius: 10 }}
          onPress={() => { kirimData() }}>
          <Text style={{ marginHorizontal: 8, fontSize: 20, fontWeight: '500' }}>Kirim</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default BeratKendaraan

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
