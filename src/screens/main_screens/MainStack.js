import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './HomeScreen';
import {SecurityDetailScreen} from '../detail_screens/security_screens/security_screens';
import {PorterDetailScreen} from '../detail_screens/porter_screens/porter_screen';

const MainStack = createStackNavigator();

export function MainStackNavigator() {
  return (
    <MainStack.Navigator
    mode={'modal'}
    screenOptions={{
        headerShown: true
    }}>
      <MainStack.Screen
        name={'Homescreen'}
        component={HomeScreen}
        options={{
          title: 'Home Screen',headerShown: false
        }}
      />  
    <MainStack.Screen
    name={'SecurityDetailScreen'}
    component={SecurityDetailScreen}
    options={{
      title: 'Halaman Detail',
    }}
  />
  <MainStack.Screen
    name={'PorterDetailScreen'}
    component={PorterDetailScreen}
    options={{
      title: 'Halaman Detail',
    }}
  />
    </MainStack.Navigator>
  );
}