import React, { useState, useContext, useEffect, Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableWithoutFeedback, TouchableOpacity, Dimensions, Alert, Linking, Button, RefreshControl, BackHandler } from 'react-native';
import SecureStorage from '@react-native-community/async-storage';
// import { BASE_URL} from '../../config/index';
import { AuthContext } from '../../contexts/AuthContext';
import { Loading } from '../../components/Loading';
import { AuthContainer } from '../../components/AuthContainer'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements'
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';

export function HomeScreen({ navigation }) {

  const [exitApp, SETexitApp] = useState(false)
  const [loading, setLoading] = useState(false);
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

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      firstLoad()
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {

    firstLoad()
   

  }, [])

  //   useEffect(() =>
  //   {
  //       const backHandler = BackHandler.addEventListener(
  //           "hardwareBackPress",
  //           backAction
  //       );
  //       return () => backHandler.remove();
  //   },[exitApp]) 


  //   const backAction = () => {
  //     if(exitApp==false){
  //         SETexitApp(true);
  //         Toast.showWithGravity('Tekan Sekali Lagi Untuk Keluar', Toast.LONG, Toast.TOP);
  //         console.log(SecurityWeighBridge)
  //         console.log(SecurityWeighBridgeCode)

  //     }
  //     else if(exitApp==true){
  //         BackHandler.exitApp()
  //     }

  //     setTimeout(()=>{
  //         SETexitApp(false)
  //     }, 4000);
  //     return true;
  // };

  async function HomePageRefresh(code, name, role) {
    // _____________ Security _____________
    if (role == 'Security') {
      let respond = null

      // setTimeout(() => {
      //   if (respond == null) {
      //     setLoading(false)
      //     Alert.alert('Gagal Mengambil Data, Perikas Koneksi Anda, dan Coba Lagi')
      //   }
      // }, 25000)

      const IpLocal = await SecureStorage.getItem('localhost')
      const BASE_URL = JSON.parse(IpLocal)
      await fetch(`${BASE_URL}cpapi/v1/Transaction/WB_GetListVehicle/${code}/${name}`, {
        timeout: 500,
        method: 'Get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })

        .then((res) => {
          respond = res
          console.log({ 'Get Security Transaction Data': res.status })
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
        .catch((error) => {
          console.log(error)
          Alert.alert('Gagal Mengambil Data, Perikas Koneksi Anda, dan Coba Lagi')
          setLoading(false)
        });


    } else {
      // _____________ Porter _____________
        const IpLocal = await SecureStorage.getItem('localhost')
        const BASE_URL = JSON.parse(IpLocal)
      await fetch(`${BASE_URL}cpapi/v1/Transaction/Dock_GetListVehicle/${code}/${name}`, {
        method: 'Get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          console.log({ 'Get Porter Transaction Data': res.status })
          if (res.status !== 200) {
            Alert.alert('Gagal Mengambil Daftar Dock')
            setLoading(false)
          } else {
            return res.json()
          }
        })
        .then((json) => {
          setDataPorter(json.Data)
          setLoading(false)
        })
        .catch((error) => {
          setLoading(false)
          console.log(error)
          Alert.alert('Gagal Mengambil Data, Perikas Koneksi Anda, dan Coba Lagi')
        });
    }
  }

  async function firstLoad() {
    try {
      setLoading(true)
      const name = await SecureStorage.getItem('token')
      setuserName(JSON.parse(name))
      const FullName = await SecureStorage.getItem('user_name')
      setfullName(JSON.parse(FullName))
      const role = await SecureStorage.getItem('user_role')
      setuserRole(JSON.parse(role))
      const Porter = JSON.stringify("Porter")
      const TimbanganCode = await SecureStorage.getItem('TimbanganCode')
      setSecurityWeighBridgeCode(JSON.parse(TimbanganCode))
      const NamaTimbanganCode = await SecureStorage.getItem('NamaTimbanganCode')
      setSecurityWeighBridge(JSON.parse(NamaTimbanganCode))
      const dockCode = await SecureStorage.getItem('dockCode')
      setPorterdock(JSON.parse(dockCode))
      if (TimbanganCode !== null || dockCode !== null) {
        console.log('Refresh Home Page')
        if (role == Porter) {
          setIsPorter(true)
          HomePageRefresh(JSON.parse(dockCode), JSON.parse(name), JSON.parse(role))
        } else {
          HomePageRefresh(JSON.parse(TimbanganCode), JSON.parse(name), JSON.parse(role))
        }
      } else {
        console.log('Hit FirstLoad')
        if (role == Porter) {
          console.log('You Are Porter')
          setIsPorter(true)
          getDockList(JSON.parse(name), JSON.parse(role))
        } else {
          console.log('You Are Security')
          getWeighBridgeList(JSON.parse(name), JSON.parse(role))
        }
        setLoading(false)
      }
    } catch {
      Alert.alert('Error')
    }
  }

  async function getWeighBridgeList(nameUser, roleUser) {
    
    const IpLocal = await SecureStorage.getItem('localhost')
    const BASE_URL = JSON.parse(IpLocal)
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
      .catch((error) => {
        setLoading(false)
        console.log(error)
        Alert.alert('Gagal Mengambil Data, Perikas Koneksi Anda, dan Coba Lagi')
      });
  }

  async function getDockList(nameUser, roleUser) {
    
    const IpLocal = await SecureStorage.getItem('localhost')
    const BASE_URL = JSON.parse(IpLocal)
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
      .catch((error) => {
        setLoading(false)
        console.log(error)
        Alert.alert('Gagal Mengambil Data, Perikas Koneksi Anda, dan Coba Lagi')
      });
  }


  function emptyVehicleList() {
    return (
      <View>
        <Text>No Data Found</Text>
        <TouchableOpacity
          onPress={async () => {
            try {
              await setLoading(true)
              firstLoad()
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
        console.log(userRole)
        if (userRole == "Porter") {
          navigation.navigate('PorterDetailScreen', {
            id_transaksi: e.data,
            username: userName,
            dockCode: Porterdock,
            checkIn: currentDate
          })
        } else {
          navigation.navigate('SecurityDetailScreen', {
            ID_Number: e.data,
            UserName: userName,
            wbcode: SecurityWeighBridgeCode,
            checkIn: currentDate
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

         {/* Data Kendaraan*/}
         <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Text style={{ color: 'black' }}>Kendaraan : </Text>
          <Text style={{ flexWrap: 'wrap', color: 'black', fontSize: 16 }}>{item.kendaraan}</Text>
        </View>
        {/* Data Kendaraan*/}

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
        
        const IpLocal = await SecureStorage.getItem('localhost')
        const BASE_URL = JSON.parse(IpLocal)
        // HIT API GET DAFTAR KENDARAAN SECURITY DISINI
        fetch(`${BASE_URL}cpapi/v1/Transaction/WB_GetListVehicle/${TimbanganCode}/${userName}`, {
          method: 'Get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then((res) => {
            console.log({ "Pilih Timbangan": res.status })
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
          .catch((error) => {
            setLoading(false)
            console.log(error)
            Alert.alert('Gagal Mengambil Data, Periksa Koneksi Anda, dan Coba Lagi')
          });

        // await setDataSecurity(vehicle_list_security)
        setSecurityWeighBridge(NamaTimbangan)
        setSecurityWeighBridgeCode(TimbanganCode)
        SecureStorage.setItem('TimbanganCode', JSON.stringify(TimbanganCode))
        SecureStorage.setItem('NamaTimbanganCode', JSON.stringify(NamaTimbangan))
      } catch {
        Alert.alert('Error Pilih Timbangan')
      } finally {
        setLoading(false)
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
          <View style={{ alignItems: 'center' }}>
            <Text style={{ flexWrap: 'wrap', color: 'black', fontSize: 15 }} >Role</Text>
            <Text style={{ color: 'black', fontSize: 23, fontWeight: 'bold', marginTop: -5 }}>{userRole}</Text>
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
                  await SecureStorage.removeItem('NamaTimbanganCode');
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
                    checkIn: currentDate
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
               await   setLoading(false)
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
        // HIT API GET DAFTAR KENDARAAN Porter  DISINI
        const IpLocal = await SecureStorage.getItem('localhost')
        const BASE_URL = JSON.parse(IpLocal)
        await fetch(`${BASE_URL}cpapi/v1/Transaction/Dock_GetListVehicle/${dockCode}/${userName}`, {
          method: 'Get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then((res) => {
            console.log({ "Pilih Dock": res.status })
            if (res.status !== 200) {
              Alert.alert('Gagal Mengambil Daftar Dock')
              setLoading(false)
            } else {
              return res.json()
            }
          })
          .then((json) => {
            setDataPorter(json.Data)
            setLoading(false)
          })
          .catch((error) => {
            setLoading(false)
            console.log(error)
            Alert.alert('Gagal Mengambil Data, Periksa Koneksi Anda, dan Coba Lagi')
          });

        // await setDataSecurity(vehicle_list_security)
        await setPorterdock(dockCode)
        SecureStorage.setItem('dockCode', JSON.stringify(dockCode))
      } catch {
        Alert.alert('Error Memilih Timbangan')
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
            refreshControl={<RefreshControl refreshing={isRefreshing}
              onRefresh={() => { firstLoad() }} />}
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
          <View style={{ alignItems: 'center' }}>
            <Text style={{ flexWrap: 'wrap', color: 'black', fontSize: 15 }} >Role</Text>
            <Text style={{ color: 'black', fontSize: 23, fontWeight: 'bold', marginTop: -5 }}>{userRole}</Text>
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
                  await SecureStorage.removeItem('dockCode');
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
          refreshControl={<RefreshControl refreshing={isRefreshing}
            onRefresh={() => { firstLoad() }} />}
          data={dataPorter}
          keyExtractor={({ id_transaksi }, index) => id_transaksi}
          renderItem={({ item }) => (
            <View>
              <TouchableWithoutFeedback
                onPress={() => {

                  navigation.navigate('PorterDetailScreen', {
                    id_transaksi: item.id_transaksi,
                    username: userName,
                    dockCode: Porterdock,
                    checkIn: currentDate
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
                  await setLoading(false)
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