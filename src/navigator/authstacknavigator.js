import React from 'react';
import {View, Text, Button } from 'react-native';
import {Loginscreen} from '../screens/login_screens/Loginscreen';
import TermsAndConditions from '../screens/login_screens/termandconditions'
import {createStackNavigator} from '@react-navigation/stack';

const AuthStack = createStackNavigator();

export default function authstacknavigator() {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <AuthStack.Screen name={'Login'} component={Loginscreen} />
            <AuthStack.Screen name={'Terms_and_conditions'} component={TermsAndConditions} />
        </AuthStack.Navigator>
    )
};


