import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginStackParamList} from './stack_types';
import {LoginScreen} from '../containers/Login';
import {SignupScreen} from '../containers/Signup';
const Stack = createNativeStackNavigator<LoginStackParamList>();
export const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};
