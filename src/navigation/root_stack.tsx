import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './stack_types';
import {LoginStack} from './login_stack';
import {AppStack} from './app_stack';
import {WelcomeScreen} from '../containers/WelcomeScreen';
const Stack = createNativeStackNavigator<RootStackParamList>();
export const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="LoginStack" component={LoginStack} />
      <Stack.Screen name="AppStack" component={AppStack} />
    </Stack.Navigator>
  );
};
