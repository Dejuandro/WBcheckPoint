import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Button, Image, ScrollView, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BeratKendaraan from './beratkendaraan'
import {BeratContext} from '../../../contexts/BeratContext'
import {KondisiKendaraan} from './kondisikendaraan'
import { Loading } from '../../../components/Loading';
import { BASE_URL } from '../../../config/index';
import { cos } from 'react-native-reanimated';




const Tab = createMaterialTopTabNavigator();

export function SecurityDetailScreen({ route,navigation }) {


  const [DataBeratKendaraan, setDataBeratKendaraan]= useState(null)
  const [DataKondisiKendaraan, setDataKondisiKendaraan]= useState(null)
  const [ResultKondisi, setResultKondisi]= useState(null)  
  const [DetailData, setDetailData] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDataDetails()
  }, [])

  async function getDataDetails() {
    await fetch(`${BASE_URL}cpapi/v1/Transaction/WB_GetVehicleDetails/${route.params.ID_Number}/${route.params.UserName}/${route.params.wbcode}`, {
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
            setDataDetail(resJson)
          }
        }
      })
     function setDataDetail(json) {
      json.Data.map(DataDetail => {
        const data_detail = 
        {
          "id_transaksi": "ID322",
          "nama_supir": "Janurdin",
          "No_Plat": "B 3244 NO",
          "tanggal": "24/10/2020",
          "pukul": "09:12",
          "vendor": "PT. Kesatria",
          "status": "security1",
          "kendaraan": "Mitshubishi Fuso",
          "kelengkapan": [
            {
              "nama": "Dongkrak",
              "jumlah": "2"
            }, {
              "nama": "Roda Ban",
              "jumlah": "6"
            }, {
              "nama": "Roda Ban Serap",
              "jumlah": "2"
            }
          ]
        }
        setDetailData(DataDetail)
      })
      setLoading(false)
     }
  }

  const Value = React.useMemo(
    () => ({
      databerat: (Berat, NoteBerat, Photo) => {
        const All_BeratData = {
          "Berat": Berat,
          "NoteBerat": NoteBerat,
          "GambarBeratMobil": Photo
        }
        setDataBeratKendaraan(All_BeratData)
      },
      dataKondisi: (All_KondisiData) => {
        setDataKondisiKendaraan({
          "kelengkapan": All_KondisiData
        })
      },
      kirimData: async () => {
        setLoading(true)
        
        if (DataBeratKendaraan.Berat == null || DataBeratKendaraan.NoteBerat == null || DataBeratKendaraan.GambarBeratMobil == null) {
          Alert.alert('Semua Data Berat Kendaraan Harus Di isi')
        } else {
          try {
            var tmp = []
           const data = await DataKondisiKendaraan.kelengkapan.map( (DataLooping) => {
            // console.log(DataLooping)

            if (DataLooping.note == undefined && DataLooping.status == false) {
              Alert.alert('Note ' + DataLooping.nama + ' Harus Diisi')
              tmp = [null]
              setLoading(false)
            } else {
              console.log(DataLooping.status)
              if (DataLooping.image == undefined && DataLooping.status !== false) {
                Alert.alert('Gambar ' + DataLooping.nama + ' Harus Diambil')
                tmp = [null]
                setLoading(false)
              } else {
                setLoading(false)
                const stat = {'status' : true}
                return  true
              }
            }
          })
            await kirimData(data)
          } catch {
            Alert.alert('Error Kirim Data, Coba Lagi')
          }

        }
      }
    }),
  );


  async function kirimData(tmp) {
    function isTrue(n) {
      return n == true;
    }
    try {
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
      const isValid = await tmp.every(isTrue)
      if (isValid == true) {
        const PostData = {
          "id_transaksi": DetailData.id_transaksi,
          "username": route.params.UserName,
          "checkIn": route.params.checkIn,
          "checkOut": currentDate,
          "DataBerat": DataBeratKendaraan,
          "DataKondisi": DataKondisiKendaraan.kelengkapan
        }
        await fetch(`${BASE_URL}cpapi/v1/Transaction/WB_PostData`, {
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
              Alert.alert('Gagal Menyimpan Data, Ulangi Lagi !')
            } else {
              return res.json()
            }
          })
          .then((json) => {
            Alert.alert('Sukses Mengirim Data Transaksi '+ PostData.id_transaksi)
            console.log(json)
            navigation.push('Homescreen')

          })
      }
    } catch {
      Alert.alert('Gagal Menyimpan Data, Ulangi Lagi !')
   }
   
    // console.log(tmp)
    // const isValid = await tmp.every('true')
    // await console.log(isValid)
  }


  return (
    <BeratContext.Provider value={Value}>
      {loading ? <Loading loading={loading} /> : <Tab.Navigator >
        <Tab.Screen name="BeratKendaraan" >{() => (<BeratKendaraan data_detail={DetailData} />)}</Tab.Screen>
        <Tab.Screen name="KondisiKendaraan">{() => (<KondisiKendaraan data_detail={DetailData} />)}</Tab.Screen>
      </Tab.Navigator>}
      </BeratContext.Provider>
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