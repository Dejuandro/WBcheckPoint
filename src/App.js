/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text, Button } from 'react-native';
import AuthStackNavigator from './navigator/authstacknavigator'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import {SplashScreen} from './screens/SplashScreen'
import {useAuth} from './hooks/useAuth'
import SecureStorage from '@react-native-community/async-storage';
import {MainStackNavigator} from './screens/main_screens/MainStack'
import {AuthContext} from './contexts/AuthContext'
import {UserContext} from './contexts/UserContext';

const RootStack = createStackNavigator();


export default function () {
    
const {auth, state} = useAuth();
const [isUser, setisUser] = React.useState(undefined);

  async function isUserLoggedIn() {
    const name = await SecureStorage.getItem('token')
    setisUser(JSON.parse(name))
  }
    function renderScreens() {

      isUserLoggedIn()
      if (state.loading) {
        return <RootStack.Screen name={'Splash'} component={SplashScreen} />;
      }
      console.log({'IsUser':isUser})
      if (isUser == null) {
        return <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />
      } else {
        return (<RootStack.Screen name={'MainStack'}>
          {() => (
            <UserContext.Provider value={state.token}>
              <MainStackNavigator />
            </UserContext.Provider>
          )}
        </RootStack.Screen>)
        }
        // return state.token ? (
        //   <RootStack.Screen name={'MainStack'}>
        //     {() => (
        //       <UserContext.Provider value={state.token}>
        //         <MainStackNavigator />
        //       </UserContext.Provider>
        //     )}
        //   </RootStack.Screen>
        // ) : (
        //   <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />
        // );
      }

    return (
        <AuthContext.Provider value={auth}>
        <NavigationContainer>
            <RootStack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                {renderScreens()}
            </RootStack.Navigator>
        </NavigationContainer>
        </AuthContext.Provider>
    )
};


