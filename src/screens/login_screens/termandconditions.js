import React, {useState} from 'react';
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


export default function termandconditions ({navigation}) {
    
    return (
        <View style={styles.container}>
            <Text style={styles.loginTitle}> Term And Conditions</Text>
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



