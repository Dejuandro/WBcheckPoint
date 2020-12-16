import React, { useState, useContext, useEffect, Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableWithoutFeedback, TouchableOpacity, Dimensions, Alert, Linking, Button, RefreshControl } from 'react-native';
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
  const [isRefreshing, setisRefreshing] = useState(false)
  const [fullName, setfullName] = useState()
  const [userName, setuserName] = useState()
  const [userRole, setuserRole] = useState()
  const { logout } = useContext(AuthContext);
  const [dataSecurity, setDataSecurity] = useState([])
  const [dataPorter, setDataPorter] = useState([])
  const [isVisibleScan, setisVisibleScan] = useState(false)
  const [StatusColor, setStatusColor] = useState()
  const [IsPorter, setIsPorter] = useState()
  const [Porterdock, setPorterdock] = useState(null)
  const [ListDock, setListDock] = useState()
  const [SecurityWeighBridge, setSecurityWeighBridge] = useState()
  const [SecurityWeighBridgeCode, setSecurityWeighBridgeCode] = useState()
  const [ListWeighBridge, setListWeighBridge] = useState()
  const [ModalPilihan, setModalPilihan] = useState(false)

  const wb = SecurityWeighBridgeCode

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     console.log(wb)
  //     HomePageRefresh();
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  useEffect(() => {
    firstLoad()
  }, [])

  function HomePageRefresh(TimbanganCode, name) {
    try {
      // HIT API GET DAFTAR KENDARAAN SECURITY DISINI
      fetch(`${BASE_URL}cpapi/v1/Transaction/WB_GetListVehicle/${TimbanganCode}/${name}`, {
        method: 'Get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          console.log(res.status)
          if (res.status !== 200) {
            Alert.alert('Gagal Mengambil Daftar Timbangan')
          } else {
            return res.json()
          }
        })
        .then((json) => {
          setDataSecurity(json.Data)
          setLoading(false)
        })
    } catch {
      Alert.alert('Error Pilih Timbangan')
    }
  }

  async function firstLoad() {
    try {
      await setLoading(true)
      const name = await SecureStorage.getItem('token')
      await setuserName(JSON.parse(name))
      const FullName = await SecureStorage.getItem('user_name')
      await setfullName(JSON.parse(FullName))
      const role = await SecureStorage.getItem('user_role')
      await setuserRole(JSON.parse(role))
      const Porter = JSON.stringify("Porter")
      const TimbanganCode = await SecureStorage.getItem('TimbanganCode')
      if (TimbanganCode !== null) {
        console.log('Refresh Home Page')
        // await setisRefreshing(true)
        HomePageRefresh(JSON.parse(TimbanganCode), JSON.parse(name))
      } else {
        console.log('Hit FirstLoad')
        if (role == Porter) {
          console.log('You Are Porter')
          await setIsPorter(true)
          await getDockList(JSON.parse(name), JSON.parse(role))
        } else {
          console.log('You Are Security')
          await getWeighBridgeList(JSON.parse(name), JSON.parse(role))
        }
        await setLoading(false)
      }
    } catch {
      Alert.alert('Error')
    }
  }

  async function getWeighBridgeList(nameUser, roleUser) {
    await fetch(`${BASE_URL}cpapi/v1/Master/GetWBByRole/${nameUser}/${roleUser}`, {
      method: 'Get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 200) {
          Alert.alert('Gagal Mengambil Daftar Timbangan')
        } else {
          return res.json()
        }
      })
      .then((json) => {
        // console.log(json)
        setModalPilihan(true)
        setListWeighBridge(json.Data)
        setLoading(false)
      })
  }

  async function getDockList(nameUser, roleUser) {
    await fetch(`${BASE_URL}cpapi/v1/Master/GetDockByRole/${nameUser}/${roleUser}`, {
      method: 'Get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 200) {
          Alert.alert('Gagal Mengambil Daftar Timbangan')
        } else {
          return res.json()
        }
      })
      .then((json) => {
        setModalPilihan(true)
        setListDock(json.Data)
        setLoading(false)
      })
  }



  const List_LoadDoc =
  {
    "dock": [
      {
        "dock": "1",
        "dockCode": "001",
        "Lokasi": "Pintu Timur 001"
      }, {
        "dock": "2",
        "dockCode": "002",
        "Lokasi": "Pintu Timur 002"
      }, {
        "dock": "3",
        "dockCode": "003",
        "Lokasi": "Pintu Barat 001"
      }, {
        "dock": "4",
        "dockCode": "004",
        "Lokasi": "Pintu Utara 001"
      }, {
        "dock": "5",
        "dockCode": "005",
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

  function emptyVehicleList() {
    return (
      <View>
        <Text>No Data Found</Text>
        <TouchableOpacity
          onPress={async () => {
            try {
              await setLoading(true)
              if (userRole == 'Security') {
                await OnClickPilihTimbangan(SecurityWeighBridge, SecurityWeighBridgeCode)
              } else {
                await OnClickPilihdock(Porterdock)
              }
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

  function emptyWBDOCKList() {
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



  function scanQrCode() {
    async function onSuccess(e) {
      try {
        await setLoading(true)
        {
          navigation.navigate('SecurityDetailScreen', {
            ID_Number: e.data,
            UserName: userName,
            wbcode: SecurityWeighBridgeCode
          })
        }
      } catch {
        Alert.alert('Error')
      } finally {
        await setisVisibleScan(false)
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
        if (status == "WB_IN") {
          return "#26d7ff"
        } else {
          return "#31e000"
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
          alignItems: 'center'
        }}>
          <Text style={{ flexWrap: 'wrap', fontWeight: 'bold', fontSize: 20 }} numberOfLines={1}>{item.no_plat}</Text>
          <Text style={{ flexWrap: 'wrap', fontWeight: 'bold', fontSize: 13 }}>{item.id_transaksi}</Text>
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


  async function OnClickPilihTimbangan(NamaTimbangan, TimbanganCode) {
    if (TimbanganCode !== undefined || NamaTimbangan !== undefined) {
      try {
        // HIT API GET DAFTAR KENDARAAN SECURITY DISINI
        await fetch(`${BASE_URL}cpapi/v1/Transaction/WB_GetListVehicle/${TimbanganCode}/${userName}`, {
          method: 'Get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then((res) => {
            console.log(res.status)
            if (res.status !== 200) {
              Alert.alert('Gagal Mengambil Daftar Timbangan')
            } else {
              return res.json()
            }
          })
          .then((json) => {
            setDataSecurity(json.Data)
            setLoading(false)
          })

        // await setDataSecurity(vehicle_list_security)
        await setSecurityWeighBridge(NamaTimbangan)
        await setSecurityWeighBridgeCode(TimbanganCode)
        await SecureStorage.setItem('TimbanganCode', JSON.stringify(TimbanganCode))
      } catch {
        Alert.alert('Error Pilih Timbangan')
      } finally {
        await setLoading(false)
      }
    }
  }


  function PilihWeighBridge() {
    return (
      <Modal isVisible={ModalPilihan}>
        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Pilih Lokasi Timbangan</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={emptyWBDOCKList}
            refreshControl={<RefreshControl refreshing={isRefreshing}
              onRefresh={() => { firstLoad() }} />}
            data={ListWeighBridge}
            keyExtractor={({ timbanganCode }, index) => timbanganCode}
            renderItem={({ item }) => (
              <View style={{ padding: 10 }}>
                <Button
                  onPress={async () => {
                    try {
                      await setLoading(true)
                      await setModalPilihan(false)
                      await OnClickPilihTimbangan(item.NamaTimbangan, item.timbanganCode)
                    } catch {
                      Alert.alert('Error Pilih Timbangan')
                    }
                  }}
                  title={item.NamaTimbangan} />
              </View>
            )} />
        </View>
        <Loading loading={loading} />
      </Modal>
    )
  }


  function SecurityScreen() {
    return (
      <AuthContainer  >
        {SecurityWeighBridgeCode ? <View /> : PilihWeighBridge()}
        <View style={styles.header} >
          <Text style={{ color: 'black', fontSize: 16 }}>{fullName} </Text>
         <View style={{alignItems:'center'}}>
         <Text style={{ flexWrap: 'wrap', color: 'black', fontSize: 15 }} >Role</Text>
         <Text style={{ color: 'black', fontSize: 23, fontWeight: 'bold', marginTop:-5 }}>{userRole}</Text>
         </View>
          <TouchableOpacity
            onPress={async () => {
              try {
                await setLoading(true)
                await logout()
              } catch {
                console.log('error')
              }
            }}>
            <Icon
              size={20}
              name='log-out'
              title="Keluar"
              type='ionicon'
              color='black'
            />
            <Text style={{ fontSize: 15 }}>Keluar</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ alignSelf: 'flex-start', fontSize: 25, fontWeight: 'bold', marginTop: 10 }}>Daftar Kendaraan Security</Text>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'flex-start' }}>
          <Text style={{ alignSelf: 'flex-start', fontSize: 15, fontWeight: 'bold', marginBottom: 10 }}>Timbangan : {SecurityWeighBridge}</Text>
          <View style={{ alignSelf: 'flex-start', marginHorizontal: 15 }}>
            <Button
              onPress={async () => {
                try {
                  await setLoading(true)
                  await setSecurityWeighBridgeCode(null)
                  await SecureStorage.removeItem('TimbanganCode');
                  await firstLoad()
                  await setModalPilihan(true)
                } catch {
                  Alert.alert('Error')
                }
              }}
              title={'Tukar'} />
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ alignSelf: 'center' }}
          ListEmptyComponent={emptyVehicleList}
          data={dataSecurity}
          refreshing={isRefreshing}
          onRefresh={() => { firstLoad() }}
          keyExtractor={({ id_transaksi }, index) => id_transaksi}
          renderItem={({ item }) => (
            <View>
              <TouchableWithoutFeedback
                onPress={() => {
                  var date = new Date().getDate(); //To get the Current Date
                  var month = new Date().getMonth() + 1; //To get the Current Month
                  var year = new Date().getFullYear(); //To get the Current Year
                  var hours = new Date().getHours(); //To get the Current Hours
                  var min = new Date().getMinutes(); //To get the Current Minutes
                  var sec = new Date().getSeconds(); 
                  const currentDate = (
                    date + '/' + month + '/' + year 
                    + ' ' + hours + ':' + min + ':' + sec
                  );

                  navigation.navigate('SecurityDetailScreen', {
                    ID_Number: item.id_transaksi,
                    UserName: userName,
                    wbcode: SecurityWeighBridgeCode,
                    checkIn : currentDate
                  })
                }}
              >
                {listView(item)}
              </TouchableWithoutFeedback>
            </View>
          )} />

        {scanQrCode()}

        <View style={{ alignSelf: 'flex-start' }}>
          <View style={{ backgroundColor: '#1f94c2', position: 'absolute', width: 60, height: 60, alignItems: 'center', justifyContent: 'center', bottom: '1%', borderRadius: 50, elevation: 5 }}>
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
                size={40}
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

  async function OnClickPilihdock(dockCode) {

    if (dockCode !== undefined) {
      try {
        // HIT API GET DAFTAR KENDARAAN SECURITY DISINI
        await fetch(`${BASE_URL}cpapi/v1/Transaction/Dock_GetListVehicle/${dockCode}/${userName}`, {
          method: 'Get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then((res) => {
            console.log(res.status)
            if (res.status !== 200) {
              Alert.alert('Gagal Mengambil Daftar Dock')
            } else {
              return res.json()
            }
          })
          .then((json) => {
            setDataPorter(json.Data)
            setLoading(false)
          })

        // await setDataSecurity(vehicle_list_security)
        await setPorterdock(dockCode)
      } catch {
        Alert.alert('Error Pilih Timbangan')
      } finally {
        await setLoading(false)
      }
    }

    await setPorterdock(dockCode)
    await setModalPilihan(false)
    await setLoading(false)
  }


  function pilihdock() {
    return (
      <Modal isVisible={ModalPilihan}>
        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Pilih Lokasi Dock</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={emptyWBDOCKList}
            data={ListDock}
            keyExtractor={({ DockCode }, index) => DockCode}
            renderItem={({ item }) => (
              <View style={{ padding: 10 }}>
                <Button
                  onPress={async () => {
                    try {
                      await setLoading(true)
                      await setModalPilihan(false)
                      await OnClickPilihdock(item.DockCode)
                    } catch {
                      Alert.alert('Error')
                    }
                  }}
                  title={'Dock' + ' ' + item.DockCode} />
              </View>
            )} />
        </View>
        <Loading loading={loading} />
      </Modal>
    )
  }


  function PorterScreen() {
    return (
      <AuthContainer>
        {Porterdock ? <View /> : pilihdock()}
        <View style={styles.header} >
          <Text style={{ color: 'black', fontSize: 16 }}>{fullName} </Text>
         <View style={{alignItems:'center'}}>
         <Text style={{ flexWrap: 'wrap', color: 'black', fontSize: 15 }} >Role</Text>
         <Text style={{ color: 'black', fontSize: 23, fontWeight: 'bold', marginTop:-5 }}>{userRole}</Text>
         </View>
          <TouchableOpacity
            onPress={async () => {
              try {
                await setLoading(true)
                await logout()
              } catch {
                console.log('error')
              }
            }}>
            <Icon
              size={20}
              name='log-out'
              title="Keluar"
              type='ionicon'
              color='black'
            />
            <Text style={{ fontSize: 15 }}>Keluar</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ alignSelf: 'flex-start', fontSize: 25, fontWeight: 'bold', marginTop: 10 }}>Daftar Kendaraan Porter</Text>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'flex-end', alignContent: 'center' }}>
          <Text style={{ alignSelf: 'flex-start', fontSize: 15, fontWeight: 'bold', marginBottom: 10 }}>DOCK : {Porterdock}</Text>
          <View style={{ alignSelf: 'flex-start', marginHorizontal: 20 }}>
            <Button
              onPress={async () => {
                try {
                  await setLoading(true)
                  await setPorterdock(null)
                  await firstLoad()
                  await setModalPilihan(true)
                } catch {
                  console.log('Error')
                }
              }}
              title={'Tukar'} />
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ alignSelf: 'center' }}
          ListEmptyComponent={emptyVehicleList}
          data={dataPorter}
          keyExtractor={({ id_transaksi }, index) => id_transaksi}
          renderItem={({ item }) => (
            <View>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('PorterDetailScreen', {
                    id_transaksi: item.id_transaksi,
                    username: userName,
                    dockCode: Porterdock
                  })
                }}
              >
                {listView(item)}
              </TouchableWithoutFeedback>
            </View>
          )} />

        {scanQrCode()}


        <View style={{ alignSelf: 'flex-start' }}>
          <View style={{ backgroundColor: '#1f94c2', position: 'absolute', width: 60, height: 60, alignItems: 'center', justifyContent: 'center', bottom: '1%', borderRadius: 50, elevation: 5 }}>
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
                size={40}
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