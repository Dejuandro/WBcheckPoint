import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    StatusBar,
    Button,
    Alert,
    TouchableHighlight
} from 'react-native';
import SecureStorage from '@react-native-community/async-storage';


export default function termandconditions ({navigation}) {


    const [LocalHost, setLocalHost] = useState()
    const [InputLocalHost, setInputLocalHost] = useState(LocalHost)

    
useEffect(() => {

    getLocalHost()

  }, [])

 async function getLocalHost(){
      
    const IpLocal = await SecureStorage.getItem('localhost')
     await setLocalHost(IpLocal)
  }

    
    return (
        <View style={styles.container}>
            <Text style={styles.loginTitle}> Pengaturan IP </Text>
            <TextInput style={{borderWidth:0.7, borderColor:'grey', borderRadius:10, backgroundColor:'white', width:200, height:35}} placeholder='Input  Local IP ...' value={InputLocalHost} onChangeText={setInputLocalHost}/>
            <Text style={{marginBottom:20}}>Ex: 192.168.1.1</Text>
            <Button title={'Submit'}
                onPress={async () => {
                    await SecureStorage.setItem('localhost', JSON.stringify(('http://' + InputLocalHost + ':8080/rest/')));
                    const IP = await SecureStorage.getItem('localhost')
                    await setLocalHost(IP)
                    Alert.alert('IP Tersimpan')
                    navigation.popToTop()
                }} />
            <Text style={{paddingTop:10}}>Current Local IP  :</Text>
            <Text> {LocalHost}</Text>
        </View>
    );
  }

  
const styles = StyleSheet.create({
    loginTitle: {
        fontSize: 30,
        marginBottom:30
    },
    loginBtn: {
        backgroundColor: '#677e80',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        alignItems: 'center',
        marginTop:10
    },
    container: {
        padding: 20,
        paddingTop: 50,
        flex: 1,
        alignItems: 'center'
    },
    TextInput: {
        padding: 10,
        margin: 10,
        backgroundColor: '#dedede',
        borderWidth: 0.5,
        borderRadius: 10,
        width: '100%'
    }
});



