import React from 'react';
import axios from 'axios';
import SecureStorage from '@react-native-community/async-storage';
// import { BASE_URL } from '../config/index';
import { createAction } from '../utils/createAction';
import { sleep } from '../utils/sleep';
import { Alert, Text, View  } from 'react-native'

export function useAuth() {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_TOKEN':
          return {
            ...state,
            token: { ...action.payload },
          };
        case 'REMOVE_TOKEN':
          return {
            ...state,
            token: undefined,
          };
        case 'SET_LOADING':
          return {
            ...state,
            loading: action.payload,
          };
        default:
          return state;
      }
    },
    {
      token: undefined,
      loading: true,
    },
  );


  const auth = React.useMemo(
    () => ({
      Loginfunction: async (email, password) => {
        const IpLocal = await SecureStorage.getItem('localhost')
        const BASE_URL = JSON.parse(IpLocal)
        await fetch(`${BASE_URL}authenticationservice/v1/resource/Authentication`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'username': email,
            'userpass': password
          })
        })
          .then((res) => {
            if (res.status !== 200) {
              console.log(res.status)
              Alert.alert('Wrong User Name/Password')
            } else {
              console.log('Sukses Login')
              return res.json()
            }
          })
          .then(async function (json) {
            const token = email
            const user_role = json.user_role
            const user_name = json.user_name
            console.log({'username':token ,'Role': user_role,'fullName': user_name})
            //Erase Everything
            await SecureStorage.removeItem('token');
            await SecureStorage.removeItem('user_name');
            await SecureStorage.removeItem('user_role');
            await SecureStorage.removeItem('TimbanganCode');
            await SecureStorage.removeItem('NamaTimbanganCode');
            await SecureStorage.removeItem('dockCode');

            await SecureStorage.setItem('token', JSON.stringify(token));
            await SecureStorage.setItem('user_role', JSON.stringify(user_role));
            await SecureStorage.setItem('user_name', JSON.stringify(user_name));

            

            dispatch(createAction('SET_TOKEN', token));
          })

      },
      logout: async () => {
        await SecureStorage.removeItem('token');
        await SecureStorage.removeItem('user_name');
        await SecureStorage.removeItem('user_role');
        await SecureStorage.removeItem('TimbanganCode');
        await SecureStorage.removeItem('NamaTimbanganCode');
        await SecureStorage.removeItem('dockCode');
        dispatch(createAction('REMOVE_TOKEN'));
      },
      register: async (email, password) => {
        await sleep(2000);
        await axios.post(`${BASE_URL}/auth/local/register`, {
          username: email,
          email,
          password,
        });
      },
    }),
    [],
  );
  React.useEffect(() => {
    sleep(2000).then(() => {
      SecureStorage.getItem('token').then(user => {
        if (user) {
          dispatch(createAction('SET_token', JSON.parse(user)));
        }
        dispatch(createAction('SET_LOADING', false));
      });
    });
  }, []);
  return  { auth, state };
}
