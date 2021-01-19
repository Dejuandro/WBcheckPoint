import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import SecureStorage from '@react-native-community/async-storage';
import { BASE_URL } from '../../config/index';
import { AuthContext } from '../../contexts/AuthContext';
import { Loading } from '../../components/Loading';
import {AuthContainer} from '../../components/AuthContainer'


export function vehicle_list() {
    
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        const dataToken = await SecureStorage.getItem('token');
        fetch(`${BASE_URL}api/device_token/show_list`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + JSON.parse(dataToken)
            }
        })
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }
  
  return (
    <AuthContainer> 
         {/* <FlatList
    data={data.data}
    keyExtractor={({ dsmp_comp_user_comp_code }, index) => dsmp_comp_user_comp_code}
    renderItem={({ item }) => (
      <Text>{item.dsmp_comp_user_comp_name}</Text>
    )}
  /> */}
    <Text>This is list</Text>
      </AuthContainer>
  )
}
