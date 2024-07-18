import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginStackParamList} from './stack_types';
import {LoginScreen} from '../containers/Login';
import {SignupScreen} from '../containers/Signup';
import {AppColors} from '../styles/colors';
const Stack = createNativeStackNavigator<LoginStackParamList>();
export const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerShadowVisible: false,
        headerStyle: {backgroundColor: AppColors.white},
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};
