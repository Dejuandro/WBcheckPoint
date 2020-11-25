import React from 'react';
import axios from 'axios';
import SecureStorage from 'react-native-secure-storage';
import { BASE_URL } from '../config/index';
import { createAction } from '../utils/createAction';
import { sleep } from '../utils/sleep';
import { Alert, Text, View } from 'react-native'

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
        await fetch(`${BASE_URL}resource/Authentication`, {
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
            console.log(res.status)
            if (res.status !== 200) {
              console.log(res.status)
              Alert.alert('Wrong User Name')
            } else {
              return res.json()
            }
          })
          .then(async function (json) {
            const token = email
            const user_role = json.user_role
            const user_name = json.user_name
            console.log(token + user_role + user_name)
            await SecureStorage.setItem('token', JSON.stringify(token));
            await SecureStorage.setItem('user_role', JSON.stringify(user_role));
            await SecureStorage.setItem('user_name', JSON.stringify(user_name));

            dispatch(createAction('SET_TOKEN', token));
          })

      },
      logout: async () => {
        await SecureStorage.removeItem('user');
        await SecureStorage.removeItem('user_name');
        await SecureStorage.removeItem('user_role');
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
