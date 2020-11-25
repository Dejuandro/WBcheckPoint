import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './HomeScreen';
import {SecurityDetailScreen} from '../detail_screens/security_screens/security_screens';
import {PorterDetailScreen} from '../detail_screens/porter_screens/porter_screen';

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
  <MainStack.Screen
    name={'PorterDetailScreen'}
    component={PorterDetailScreen}
    options={{
      title: 'Detail Screen',
    }}
  />
    </MainStack.Navigator>
  );
}