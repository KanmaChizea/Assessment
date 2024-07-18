import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppStackParamList} from './stack_types';
import Dashboard from '../containers/Dashboard';
import Transfer from '../containers/Transfer';
import PayBills from '../containers/PayBills';
import BuyAirtime from '../containers/BuyAirtime';
import QRPayment from '../containers/QRPayment';
import Loans from '../containers/Loans';
import VirtualCards from '../containers/VirtualCards';
import ManageBeneficiaries from '../containers/ManageBeneficiaries';
import Chat from '../containers/Chat';
const Stack = createNativeStackNavigator<AppStackParamList>();
export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Transfers" component={Transfer} />
      <Stack.Screen
        name="PayBills"
        component={PayBills}
        options={{headerTitle: 'Pay Bills'}}
      />
      <Stack.Screen
        name="BuyAirtime"
        component={BuyAirtime}
        options={{headerTitle: 'Buy Airtime'}}
      />
      <Stack.Screen
        name="QRPayment"
        component={QRPayment}
        options={{headerTitle: 'QR Payment'}}
      />
      <Stack.Screen name="Loans" component={Loans} />
      <Stack.Screen
        name="VirtualCards"
        component={VirtualCards}
        options={{headerTitle: 'Virtual Cards'}}
      />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen
        name="ManageBeneficiaries"
        component={ManageBeneficiaries}
        options={{headerTitle: 'Manage Beneficiaries'}}
      />
    </Stack.Navigator>
  );
};
