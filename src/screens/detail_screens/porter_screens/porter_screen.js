import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Button, Image, ScrollView, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {ListBarang} from './ListBarang'
import { Loading } from '../../../components/Loading';
import {PorterContext} from '../../../contexts/PorterContext'
import SecureStorage from '@react-native-community/async-storage';
// import { BASE_URL} from '../../../config/index';
import {DetailKendaraan} from './DetailKendaraan'




const Tab = createMaterialTopTabNavigator();

export function PorterDetailScreen({ route, navigation }) {

  
  const [DetailData, setDetailData] = useState()
  const [ItemListData, setItemListData] = useState()
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    getDataDetails()
  }, [])


  async function getDataDetails() {
    try {
      
      const IpLocal = await SecureStorage.getItem('localhost')
      const BASE_URL = JSON.parse(IpLocal)
      await fetch(`${BASE_URL}cpapi/v1/Transaction/Dock_GetDetailVehicle/${route.params.id_transaksi}/${route.params.username}/${route.params.dockCode}`, {
        method: 'Get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(async (res) => {
          if (res.status == 400) {
            const resJson = await res.json()
            Alert.alert("Timbangan Seharusnya : " + '\n' + resJson.Data)
            navigation.popToTop()
          } else {
            if (res.status !== 200) {
              console.log(res)
              Alert.alert('Gagal Mengambil Daftar Timbangan')
              navigation.popToTop()
            } else {
              const resJson = await res.json()
              resJson.dockCode = route.params.dockCode
              setDetailData(resJson)
              setLoading(false)
            }
          }
        })


      
    } catch (err){
      console.log(err)
      Alert.alert('Error Mengambil Data')
      navigation.popToTop()
    }
  }

  const Value = React.useMemo(
    () => ({

      dataList: (ListItem) => {
        setItemListData(ListItem)
      },
      kirimData: () => {
        try {
          setLoading(true)

          const data = ItemListData.map(ItemListLoop => {
            if (ItemListLoop.itemStatus == "Proses" && ItemListLoop.image == "" ) {
              Alert.alert("Gambar " + ItemListLoop.nama + " Harus Di Isi")
              setLoading(false)
              return false
            } else {
              if (ItemListLoop.itemStatus == "Tolak" && ItemListLoop.note == "") {
                Alert.alert("Note" + ItemListLoop.nama + " Harus Di Isi")
                setLoading(false)
                return false
              } else {
                return true
              }
            }
          })

          kirimData(data)

        } catch {
          Alert.alert('Error Mengirim Data, Coba Lagi !')
        }
      }
    }),
  );

  async function kirimData(data) {
    function isTrue(n) {
      return n == true;
    }

    const isValid = await data.every(isTrue)
    if (isValid == true) {
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
      const PostData = {
        "checkIn": route.params.checkIn,
        "checkOut": currentDate,
        "username": route.params.username,
        "id_transaksi": route.params.id_transaksi,
        "dockCode": route.params.dockCode,
        "Item": ItemListData
      }
      // console.log(PostData)
      
      const IpLocal = await SecureStorage.getItem('localhost')
      const BASE_URL = JSON.parse(IpLocal)
      await fetch(`${BASE_URL}cpapi/v1/Transaction/Dock_PostData`, {
        method: 'Post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },  
        body: JSON.stringify(PostData)
      })
        .then((res) => {
          console.log(res.status)
          if (res.status !== 200) {
            console.log('Gagal Meyimpan Data')
            Alert.alert('Gagal Menyimpan Data, Ulangi Lagi ! ' + res.message)
            setLoading(false)
          } else {
            return res.json()
              .then((json) => {
                console.log(json)
                Alert.alert('Sukses Mengirim Data Transaksi ' + PostData.id_transaksi)
                // console.log(json)
                navigation.push('Homescreen')
              })
          }
        })


    } else {
      console.log('Data Masih Error')
    }
  }

  return (
    <PorterContext.Provider value={Value}>
      {loading? <Loading loading={loading}/>: <Tab.Navigator >
        <Tab.Screen name="DetailKendaraan">{() => (<DetailKendaraan data_detail={DetailData} />)}</Tab.Screen>
        <Tab.Screen name="ListBarang" >{() => (<ListBarang data_detail={DetailData} />)}</Tab.Screen>
      </Tab.Navigator>}
    </PorterContext.Provider>
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