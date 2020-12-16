import React, { useState, useContext, createContext, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Button, Image, ScrollView, Alert, FlatList, Picker,SafeAreaView } from 'react-native';
import { RNCamera, FaceDetector } from 'react-native-camera';
import { PorterContext } from '../../../contexts/PorterContext'
import Modal from 'react-native-modal';
import { Loading } from '../../../components/Loading';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Icon } from 'react-native-elements'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export function ListBarang({ data_detail, navigation }) {

  const [isColapse, setisColapse] = useState(false)
  const { dataList } = useContext(PorterContext)
  const [openCamera, setopenCamera] = useState(false);
  const [camera, setCamera] = useState();
  const [DataItem, setDataItem] = useState()
  const [ImageTmp, setImageTmp] = useState();
  const [RadioButton, setRadioButton]= useState()
  const [SelectedValue, setSelectedValue] = useState(data_detail.itemStatus)
  const [Note, setNote] = useState()
  const [imageView, setimageView] = useState(false)
  const [tmpItemCode, settmpItemCode] = useState()
  const [itemSelected, setitemSelected] = useState('next_dock')
  const [loading, setLoading] = useState(true)

  var radio_props = [
    { label: 'Tersedia  ', value: "Tersedia" },
    { label: 'Proses  ', value: "Proses" },
    { label: 'Tolak', value: "Tolak" }
  ];


  useEffect(() => {
    SetItem()

  },[])

  useEffect(() => {
    dataList(DataItem)
  }, [DataItem,RadioButton,ImageTmp,Note])



  async function SetItem() {
    data_detail.Data.Item.map(dataLooping => {
      dataLooping.image = ""
    })

    setDataItem(data_detail.Data.Item)
    // console.log(DataItem)
    if (DataItem !== undefined) {
      setLoading(false)
    }

    // data_listBarang.map(async DataLooping => {
    //   if(DataLooping.status == 1){
    //   await   DataLooping.Item.map(data=>{
    //       data.kelengkapan = "true"
    //     })
    //   await  setDataBarang(DataLooping.Item)
    //   }else{
    //   }
    // })
  }


  function showCamera() {

    async function takePicture() {
      if (camera) {
        try {
          const options = { quality: 0.5, base64: true };
          const data = await camera.takePictureAsync(options);
          // await setImageMobil('data:image/png;base64,' + data.base64)          

          await DataItem.map(DataItemLoop => {

            if (DataItemLoop.itemCode == tmpItemCode) {
              DataItemLoop.image = ('data:image/png;base64,' + data.base64)
              setImageTmp(data.base64)
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

  function ImageModal() {
    function ImageShow(image) {
      if (image !== "") {
        return (
          <View style={{ flex:1,width: 350, height: 200, }}>

            <Image accessible={false} style={{ flex: 1 }} source={{ uri: image }} />
          </View>
        )
      } else {
        return (<View><Text>Gambar Tidak Tersedia !</Text></View>)
      }
    }
    const DataRt = DataItem.map(DataItemLoop => {
      if (DataItemLoop.itemCode == tmpItemCode) {
        return (
          <Modal isVisible={imageView}>
            <View style={{ flex: 1, backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center', paddingTop: 50 }}>
              <View style={{ position: 'absolute', alignSelf: 'flex-end', zIndex: 999, flex: 1 }}>
                <Icon
                  size={50}
                  name='md-close-circle-outline'
                  type='ionicon'
                  color='black'
                  onPress={() => { setimageView(false) }}
                />
              </View>
              {ImageShow(DataItemLoop.image)}
              <View style={{ marginTop: 20 }}>
                <Button title={'Ambil Gambar'} onPress={() => {
                  try {
                    setopenCamera(true)
                  } catch {
                    Alert.alert('Error Membuka Kamera')
                  }
                }} />
              </View>
              {showCamera()}
            </View>
          </Modal>
        )
      } else {
        return null
      }
    })
    return DataRt
  }


  function listEmpty() {
    return (
      <View style={{}}>
        <Text>Kosong</Text>
      </View>
    )
  }


  function listBarang(DataList) {
    // if (DataList.itemStatus !== "Tersedia") {
    //   return (<View />)
    // } else {
      return (
        <View style={{ marginTop: 5 }}>

          <Text style={{ fontSize: 20 }}>{DataList.nama}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 5 }}>

            <View style={{ alignItems: 'flex-start', maxWidth: 200 }}>
              <Text>{DataList.jumlah}</Text>
              <TextInput
                style={styles.InputNote}
                editable={true}
                multiline
                numberOfLines={4}
                placeholder={'Tulis Catatan..'}
                onChangeText={(val) => {
                  DataList.note = val
                  setNote(val)
                }} />
            </View>

            <View>
              <RadioForm
                animation={true}
                radio_props={radio_props}
                onPress={async (value) => {
                  DataList.itemStatus = value
                  setRadioButton(value)
                }} />
            </View>

          </View>
          <Button
            title={'Gambar Barang'}
            onPress={() => {
              try {
                setLoading(true)
                settmpItemCode(DataList.itemCode)
                setimageView(true)
                setLoading(false)
              } catch {
                Alert.alert('Error Mengambil Gambar')
              }
            }}
          />
          <View style={{ borderBottomWidth: 1, marginTop: 20 }} />

        </View>
      )
    // }

  }
  return (
       <View style={{ padding: 20, flex: 1 }}>
      {loading ? <Loading loading={loading} /> : <View style={{ backgroundColor: 'white', elevation: 9, borderRadius: 10, paddingHorizontal: 20, }}>

        <FlatList
        scrollEnabled={false}
          ListEmptyComponent={listEmpty()}
          ListHeaderComponent={<Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 20 }}>{data_detail.dockCode}</Text>}
          showsVerticalScrollIndicator={false}
          data={DataItem}
          keyExtractor={({ itemCode }, index) => itemCode}
          renderItem={({ item }) => (
            listBarang(item)
          )} />
        {ImageModal()}
      </View>}
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
    marginVertical:10,
    width: 200,
    backgroundColor: '#e6e6e6',
    borderWidth: 0.5,
    borderRadius: 10
  }
})