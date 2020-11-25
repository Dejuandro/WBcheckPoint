
import SecureStorage from 'react-native-secure-storage';
import React,{useState} from 'react';


const [token, setToken] = useState('')
SecureStorage.getItem('user')
.then(user=>{
  setToken({user})
})


  export const UserToken = token