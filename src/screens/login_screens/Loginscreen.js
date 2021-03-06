/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useState,useContext } from 'react';
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
    TouchableHighlight,
    ImageBackground,
    TouchableWithoutFeedback
} from 'react-native';
import {AuthContext} from '../../contexts/AuthContext';
import {Loading} from '../../components/Loading';

import {AuthContainer} from '../../components/AuthContainer';

const InputText = (props) => {
    return (
        <TextInput
            {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
            editable
            maxLength={40}
        />
    );
}


export function Loginscreen({ navigation }) {
    
    const [loading, setLoading] = useState(false);
    const {Loginfunction} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('')
    const [required, setRequired] = useState(false)



    return (
        // <AuthContainer>
        <ImageBackground source={require('../../components/img/truckBg.png')} style={styles.image}>
            <AuthContainer>
              <View style={{alignItems:'center', backgroundColor: 'rgba(52,52,52, 0.6)',opacity:90, width:'100%', marginTop:'35%' ,padding:20, borderRadius:10}}>
              <Text style={styles.loginTitle}> Selamat Datang</Text>
                <InputText style={styles.TextInput} placeholder={'Username'} secureTextEntry={false}  value={email} onChangeText={setEmail} keyboardType="email-address" />
                <InputText style={styles.TextInput} placeholder={'Password'} secureTextEntry={true} required={true} value={password} onChangeText={setPassword} />
                <View style={{ alignSelf: 'flex-start' }}>
                    <Text style={{ color: 'red', fontSize: 15 }}>{required ? "*Error Login*" : ""}</Text>
                </View>
                <TouchableHighlight
                    style={styles.loginBtn}
                    onPress={async () => {
                        try {
                            setLoading(true)
                            await Loginfunction(email, password)
                        }
                        catch{
                            setLoading(false)
                            setRequired(true)
                            setTimeout(function () {
                                setRequired(false)
                            }, 2000)
                        }
                    }
                    }>
                    <Text style={{ color: 'white', fontSize: 20 }}>  Login  </Text>
                </TouchableHighlight>

                <View style={{ alignSelf: 'flex-end' }}>
                    <TouchableWithoutFeedback
                        activeOpacity={0.1}
                        style={styles.termsAndConditionsBtn}
                        onPress={() => navigation.navigate('Terms_and_conditions')}>
                        <Text style={styles.aturan_app}> Pengaturan Aplikasi</Text>
                    </TouchableWithoutFeedback>
                </View>
              </View>
                <Loading loading={loading} />
            </AuthContainer>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 50,
        flex: 1,
        alignItems: 'center'
    },
    aturan_app: {
        color: 'white',
        fontSize: 20,
        textDecorationLine: 'underline',
        marginTop: 20
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    loginTitle: {
        marginTop:30,
        fontSize: 40,
        marginBottom: 30,
        color: 'white'
    },
    loginBtn: {
        backgroundColor: '#2f4f4f',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        alignItems: 'center',
        marginTop: 10
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



