import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Welcome: undefined;
  LoginStack: NavigatorScreenParams<LoginStackParamList>;
  AppStack: NavigatorScreenParams<AppStackParamList>;
};
export type LoginStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};
export type AppStackParamList = {
  Dashboard: undefined;
  Transfers: undefined;
  PayBills: undefined;
  BuyAirtime: undefined;
  QRPayment: undefined;
  Loans: undefined;
  VirtualCards: undefined;
  Chat: undefined;
  ManageBeneficiaries: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
export type LoginStackScreenProps<T extends keyof LoginStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<LoginStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
export type AppStackScreenProps<T extends keyof AppStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AppStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
