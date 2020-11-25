import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './HomeScreen';
import {ScanScreen} from './scanScreen';
import {SecurityDetailScreen} from '../detail_screens/security_screens';

const MainStack = createStackNavigator();

export function MainStackNavigator() {
  return (
    <MainStack.Navigator
    screenOptions={{
        headerShown: false
    }}>
      <MainStack.Screen
        name={'Homescreen'}
        component={HomeScreen}
        options={{
          title: 'Home Screen',
        }}
      />  
    <MainStack.Screen
    name={'SecurityDetailScreen'}
    component={SecurityDetailScreen}
    options={{
      title: 'Detail Screen',
    }}
  />
    </MainStack.Navigator>
  );
}