/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const InputText = (props) => {
    return (
      <TextInput
        {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable
        maxLength={40}
      />
    );
  }



  

export default class loginscreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // email: null
            email :"",
            setEmail:''
        }

    }

    Loginfunction = (email,password) => {
        if (this.email === undefined) {
            Alert.alert(this.email +' '+ 'cannot empty')
        } else {
            Alert.alert(this.email + 'OKE')
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.loginTitle}> Welcome To Login</Text>
                <InputText style={styles.TextInput} placeholder={'Email'} secureTextEntry={false} value={this.state.email} onChangeText={this.state.setEmail} keyboardType="email-address" />
                <InputText style={styles.TextInput} placeholder={'Password'} secureTextEntry={true} required={true} value={this.state.password} />
                
                <TouchableHighlight
                    style={styles.loginBtn}
                    onPress={()=>{
                        this.Loginfunction(this.state.email, this.state.password)
                    }}>
                    <Text style={{color:'white', fontSize:20}}>
                        Login
                    </Text>
                </TouchableHighlight>

            </View>
        );
    }
};

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

