import React, { useState, useContext, useEffect, Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableWithoutFeedback, Dimensions, Alert, Linking, Button } from 'react-native';
import SecureStorage from 'react-native-secure-storage';
import { BASE_URL } from '../../config/index';
import { AuthContext } from '../../contexts/AuthContext';
import { Loading } from '../../components/Loading';
import { AuthContainer } from '../../components/AuthContainer'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements'
import Modal from 'react-native-modal';

export function HomeScreen({ navigation }) {


  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState()
  const [userName, setuserName] = useState()
  const [userRole, setuserRole] = useState()
  const { logout } = useContext(AuthContext);
  const [dataSecuirty, setDataSecurity] = useState([])
  const [dataPorter, setDataPorter] = useState([])
  const [isVisibleScan, setisVisibleScan] = useState(false)
  const [StatusColor, setStatusColor] = useState()
  const [IsPorter, setIsPorter] = useState()
  const [PorterLoadDock, setPorterLoadDock] = useState()
  const [LoadockModal, setLoadockModal] = useState(true)

  useEffect(() => {
    getPersonalData()
  }, [])

  function starting() {
    return (
      <View><Text>Starting</Text></View>
    )
  }

  async function getPersonalData() {
    const name = await SecureStorage.getItem('user_name')
    await setuserName(JSON.parse(name))
    const role = await SecureStorage.getItem('user_role')
    await setuserRole(JSON.parse(role))
    const Porter = JSON.stringify("Porter")
    if (role == Porter) {
      // console.log('You Are Porter')
      setIsPorter(true)
      // await setDataPorter(vehicle_list_Porter)
    } else {
      // console.log('You Are Security')
      setIsPorter(false)
      await setDataSecurity(vehicle_list_security)
    }
    setLoading(false)
  }

  const vehicle_list_security =
  {
    "DataList": [
      {
        "no_plat": "B 3324 NO",
        "ID_DOC": "ID322",
        "vendor": "PT. KESATRIA",
        "nama_supir": "Alimin",
        "status": "security1",
        "tanggal": "24/10/2020",
        "pukul": "09:12"
      }, {
        "no_plat": "BK 2299 JA",
        "ID_DOC": "ID390",
        "vendor": "PT. CAHAYA ABADI",
        "nama_supir": "Anto",
        "status": "security2",
        "tanggal": "24/10/2020",
        "pukul": "10:09"
      }, {
        "no_plat": "D 8922 OP",
        "ID_DOC": "ID382",
        "vendor": "PT. KESATRIA",
        "nama_supir": "ANDRI",
        "status": "security1",
        "tanggal": "24/10/2020",
        "pukul": "12:12"
      }, {
        "no_plat": "BA 1123 TT",
        "ID_DOC": "ID230",
        "vendor": "PT. CAHAYA ABADI",
        "nama_supir": "SEBASTIAN",
        "status": "security1",
        "tanggal": "24/10/2020",
        "pukul": "13:22"
      }, {
        "no_plat": "DK 3029 KP",
        "ID_DOC": "ID932",
        "vendor": "PT. MAHKOTA ABADI",
        "nama_supir": "DION",
        "status": "security1",
        "tanggal": "24/10/2020",
        "pukul": "17:12"
      }]
  }


  const List_LoadDoc =
  {
    "LoadDock": [
      {
        "LoadDock": "1",
        "LoadDockCode": "001",
        "Lokasi": "Pintu Timur 001"
      }, {
        "LoadDock": "2",
        "LoadDockCode": "002",
        "Lokasi": "Pintu Timur 002"
      }, {
        "LoadDock": "3",
        "LoadDockCode": "003",
        "Lokasi": "Pintu Barat 001"
      }, {
        "LoadDock": "4",
        "LoadDockCode": "004",
        "Lokasi": "Pintu Utara 001"
      }, {
        "LoadDock": "5",
        "LoadDockCode": "005",
        "Lokasi": "Pintu Selatan 001"
      },]
  }

  const vehicle_list_Porter =
  {
    "DataList": [
      {
        "no_plat": "B 3324 NO",
        "ID_DOC": "ID322",
        "vendor": "PT. KESATRIA",
        "nama_supir": "Alimin",
        "status": "Loading",
        "tanggal": "24/10/2020",
        "pukul": "09:12"
      }, {
        "no_plat": "BK 2299 JA",
        "ID_DOC": "ID390",
        "vendor": "PT. CAHAYA ABADI",
        "nama_supir": "Anto",
        "status": "Loading",
        "tanggal": "24/10/2020",
        "pukul": "10:09"
      }, {
        "no_plat": "D 8922 OP",
        "ID_DOC": "ID382",
        "vendor": "PT. KESATRIA",
        "nama_supir": "ANDRI",
        "status": "Unloading",
        "tanggal": "24/10/2020",
        "pukul": "12:12"
      }, {
        "no_plat": "BA 1123 TT",
        "ID_DOC": "ID230",
        "vendor": "PT. CAHAYA ABADI",
        "nama_supir": "SEBASTIAN",
        "status": "Loading",
        "tanggal": "24/10/2020",
        "pukul": "13:22"
      }, {
        "no_plat": "DK 3029 KP",
        "ID_DOC": "ID932",
        "vendor": "PT. MAHKOTA ABADI",
        "nama_supir": "DION",
        "status": "Unloading",
        "tanggal": "24/10/2020",
        "pukul": "17:12"
      }]
  }
  // async function fetchData() {
  //   const dataToken = await SecureStorage.getItem('token');
  //   try {
  //     const res = await fetch(`${BASE_URL}api/device_token/show_list`, {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         Authorization: 'Bearers ' + JSON.parse(dataToken)
  //       }
  //     })
  //     const json = await res.json()
  //     await setData(json)
  //     await setLoading(false)
  //   } catch {
  //     await setLoading(false)
  //     const errorss = 'cannot get data'
  //     setData(errorss)
  //   }
  // }

  function listEmptyComponent() {
    return (
      <View>
        <Text>No Data Found</Text>
      </View>
    )
  }



  function scanQrCode() {
    async function onSuccess(e) {
      try {
        await setLoading(true)
        await setisVisibleScan(false)
        await navigation.navigate('SecurityDetailScreen', {
          ID_Number: e.data,
        })
      } catch {
        Alert.alert('Error')
      } finally {
        await setLoading(false)
      }
    };
    return (
      <Modal isVisible={isVisibleScan}>
        <View style={{ alignSelf: 'center' }}>
          <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.torch}
          />
          <Button
            onPress={() => { setisVisibleScan(false) }}
            title={'Cancel'}
          />
          <Loading loading={loading} />
        </View>
      </Modal>
    )
  }


  function listView(item) {
    function setStatusColor(status) {
      const Security = JSON.stringify("Security")
      if (userRole == 'Porter') {
        if (status == "Loading") {
          return "#67ff26"
        } else {
          return "#fffb26"
        }
      } else {
        if (status == "security1") {
          return "#26d7ff"
        } else {
          return "#36ff8a"
        }
      }
    }

    return (
      <View style={styles.cardBox}>
        {/* PLAT DAN DOCUMENT ID */}
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <Text style={{ flexWrap: 'wrap', fontWeight: 'bold', fontSize: 20 }} numberOfLines={1}>{item.no_plat}</Text>
          <Text style={{ flexWrap: 'wrap', fontWeight: 'bold', fontSize: 20 }}>{item.ID_DOC}</Text>
        </View>
        {/* PLAT DAN DOCUMENT ID */}

        {/* Tanggal dan Jam*/}
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <Text style={{ flexWrap: 'wrap', color: '#636363', fontSize: 11 }} numberOfLines={1}>{item.tanggal}</Text>
          <Text style={{ flexWrap: 'wrap', color: '#636363', fontSize: 11 }}>{item.pukul}</Text>
        </View>
        {/* Tanggal dan Jam*/}

        {/* Data Vendor*/}
        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Text style={{ color: 'black' }}>Vendor : </Text>
          <Text style={{ flexWrap: 'wrap', color: 'black', fontSize: 16 }}>{item.vendor}</Text>
        </View>
        {/* Data Vendor*/}

        {/* Data Supir*/}
        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Text style={{ color: 'black' }}>Supir : </Text>
          <Text style={{ flexWrap: 'wrap', color: 'black', fontSize: 16 }}>{item.nama_supir}</Text>
        </View>
        {/* Data Supir*/}

        {/* Data Status*/}
        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: setStatusColor(item.status),
          padding: 5,
          borderWidth: 0.7,
          borderColor: 'grey'
        }}>
          <Text style={{ color: 'black' }}>Status : </Text>
          <Text style={{ flexWrap: 'wrap', color: 'black', fontSize: 16 }}>{item.status}</Text>
        </View>
        {/* Data Status*/}
      </View>
      /* <Text>{item.dsmp_comp_user_comp_name}</Text> */
    )
  }

  function SecurityScreen() {
    return (

      <AuthContainer>
        <View style={styles.header}>
          <Text style={{ color: 'black', fontSize: 16 }}>{userName} </Text>
          <Text style={{ flexWrap: 'wrap', color: 'black', fontSize: 16, }} onPress={async () => {
            try {
              await setLoading(true)
              await logout()
            } catch {
              console.log('error')
            }
          }}>Role : {userRole}</Text>
        </View>
        <Text style={{ alignSelf: 'flex-start', fontSize: 25, fontWeight: 'bold', marginVertical: 10 }}>Daftar Kendaraan Security</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ alignSelf: 'center' }}
          ListEmptyComponent={listEmptyComponent}
          data={dataSecuirty.DataList}
          keyExtractor={({ no_plat }, index) => no_plat}
          renderItem={({ item }) => (
            <View>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('SecurityDetailScreen', {
                    ID_Number: item.ID_DOC,
                  })
                }}
              >
                {listView(item)}
              </TouchableWithoutFeedback>
            </View>
          )} />

        {scanQrCode()}


        <View style={{ alignSelf: 'flex-start' }}>
          <View style={{ backgroundColor: '#1f94c2', position: 'absolute', width: 80, height: 80, alignItems: 'center', justifyContent: 'center', bottom: '1%', borderRadius: 50, elevation: 5 }}>
            <TouchableWithoutFeedback
              onPress={async () => {
                try {
                  await setLoading(true)
                  await setisVisibleScan(true)
                } catch {
                  Alert.alert('error')
                } finally {
                  await setTimeout(() => { setLoading(false) }, 2000)
                }
              }}
            ><Icon
                size={50}
                name='md-qr-code'
                type='ionicon'
                color='white'
              />
            </TouchableWithoutFeedback>

          </View>
        </View>

        <Loading loading={loading} />
      </AuthContainer>
    )
  }

  async function OnClickPilihLoadDock(LoadDockCode) {
    await setDataPorter(vehicle_list_Porter)
    await setPorterLoadDock(LoadDockCode)
    await setLoadockModal(false)
    await setLoading(false)
  }

  function pilihLoadDock() {
    if (PorterLoadDock == null) {
      return (
        <Modal isVisible={LoadockModal}>
          <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Pilih Lokasi Dock</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={listEmptyComponent}
              data={List_LoadDoc.LoadDock}
              keyExtractor={({ LoadDockCode }, index) => LoadDockCode}
              renderItem={({ item }) => (
                <View style={{ padding: 10 }}>
                  <Button
                    onPress={async () => {
                      try {
                        await setLoading(true)
                        await OnClickPilihLoadDock(item.LoadDockCode)
                      } catch {
                        Alert.alert('Error')
                      }
                    }}
                    title={'Dock' + ' ' + item.LoadDock} />
                </View>
              )} />
          </View>
          <Loading loading={loading} />
        </Modal>
      )
    } else {
      return (null)
    }
  }


  function PorterScreen() {
    return (
      <AuthContainer>
        {pilihLoadDock()}
        <View style={styles.header}>
          <Text style={{ color: 'black', fontSize: 16 }}>{userName} </Text>
          <Text style={{ flexWrap: 'wrap', color: 'black', fontSize: 16, }} onPress={async () => {
            try {
              await setLoading(true)
              await logout()
            } catch {
              console.log('error')
            }
          }}>Role : {userRole}</Text>
        </View>
        <Text style={{ alignSelf: 'flex-start', fontSize: 25, fontWeight: 'bold', marginTop: 10 }}>Daftar Kendaraan Porter</Text>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'flex-end' }}>
          <Text style={{ alignSelf: 'flex-start', fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}>DOCK : {PorterLoadDock}</Text>
          <TouchableWithoutFeedback onPress={async () => {
            await setPorterLoadDock(null)
            await setLoadockModal(true)
          }}>
            <Text style={{ alignSelf: 'flex-end', fontSize: 15, fontWeight: 'bold', color: 'blue', marginBottom: 10, marginLeft: 10, textDecorationLine: 'underline' }}>Ganti</Text>
          </TouchableWithoutFeedback>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ alignSelf: 'center' }}
          ListEmptyComponent={listEmptyComponent}
          data={dataPorter.DataList}
          keyExtractor={({ no_plat }, index) => no_plat}
          renderItem={({ item }) => (
            <View>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('SecurityDetailScreen', {
                    ID_Number: item.ID_DOC,
                  })
                }}
              >
                {listView(item)}
              </TouchableWithoutFeedback>
            </View>
          )} />

        {scanQrCode()}

        <View style={{ alignSelf: 'flex-start' }}>
          <View style={{ backgroundColor: '#1f94c2', position: 'absolute', width: 80, height: 80, alignItems: 'center', justifyContent: 'center', bottom: '1%', borderRadius: 50, elevation: 5 }}>
            <TouchableWithoutFeedback
              onPress={async () => {
                try {
                  await setLoading(true)
                  await setisVisibleScan(true)
                } catch {
                  Alert.alert('error')
                } finally {
                  await setTimeout(() => { setLoading(false) }, 2000)
                }
              }}
            ><Icon
                size={50}
                name='md-qr-code'
                type='ionicon'
                color='white'
              />
            </TouchableWithoutFeedback>

          </View>
        </View>

        <Loading loading={loading} />
      </AuthContainer>
    )
  }
  return (IsPorter ? (<PorterScreen />) : (<SecurityScreen />))
}


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
  cardBox: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 300,
    // shadowColor:'black',
    // shadowOpacity:0.1,
    // shadowRadius:2,
    // shadowOffset:{
    //   width:0,
    //   height:2
    // },
    elevation: 5
  },
  header: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f94c2',
    height: 50,
    padding: 10,
    marginTop: -20,
    justifyContent: 'space-between'
  }
})