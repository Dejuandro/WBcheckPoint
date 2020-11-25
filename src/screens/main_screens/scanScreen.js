
import React, { Component, useState } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking,
    View,
    Alert
} from 'react-native';
import { Loading } from '../../components/Loading';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

export function ScanScreen({navigation}) {
   
  const [loading, setLoading] = useState(false);

    function onSuccess(e) {
            try {
                setLoading(true)
                navigation.navigate('SecurityDetailScreen', {
                    ID_Number: e.data,
                  })            
            } catch {
                Alert.alert('Error')
            }finally{
                setLoading(false)
            }
        // );
       
    };

    return (
        <View style={{alignSelf:'center'}}>
            <QRCodeScanner
                onRead={onSuccess}
                flashMode={RNCamera.Constants.FlashMode.torch}
            />
            <Loading loading={loading} />
        </View>
    );
}


const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});