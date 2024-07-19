import {
  Keyboard,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {useAppDispatch} from '../../redux/hooks';
import {setUser} from '../../redux/user';

import AppTextstyles from '../../styles/textstyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoginStackScreenProps} from '../../navigation/stack_types';
import {Spacer} from '../../components/spacer';
import {AppColors} from '../../styles/colors';
import {Formik} from 'formik';
import {InputField} from '../../components/Input';
import {Button} from '../../components/Buttons';
import {object, string} from 'yup';
import {VisibilityIcon} from '../../components/Visibility';
import {useModal} from '../../hooks/useModal';
import ErrorModal from '../../components/Modal';
import EncryptedStorage from 'react-native-encrypted-storage';
import {CommonActions} from '@react-navigation/native';
import {useSigupMutation} from '../../services/api';

type RegisterFormValues = {
  fullname: string;
  username: string;
  password: string;
  accountNo: string;
};
const validationSchema = object({
  fullname: string().required('Fullname is required'),
  username: string().required('Username is required'),
  password: string().required('Password is required'),
  accountNo: string().required('Account number is required'),
});
export const SignupScreen = ({navigation}: LoginStackScreenProps<'Signup'>) => {
  const [isLoading, setLoading] = useState(false);
  const {showModal} = useModal();
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const dispatch = useAppDispatch();

  const [signupApi] = useSigupMutation();
  const signup = async (values: RegisterFormValues) => {
    try {
      if (!isLoading) {
        Keyboard.dismiss();
        setLoading(true);
        const user = await signupApi({
          fullname: values.fullname,
          username: values.username,
          password: values.password,
          accountNo: values.accountNo,
        }).unwrap();
        if (user.data !== undefined) {
          // store login
          await EncryptedStorage.setItem('login_data', JSON.stringify(values));
          //get account
          dispatch(setUser(user.data));
          navigation.dispatch(
            CommonActions.reset({
              routes: [{name: 'AppStack', params: {screen: 'Dashboard'}}],
            }),
          );
        }
        if (user.errorMessage !== undefined) {
          showModal(ErrorModal, {
            text: user.errorMessage ?? 'Something went wrong',
          });
        }
        setLoading(false);
      }
    } catch (e: any) {
      showModal(ErrorModal, {
        text: e.errorMessage ?? 'Something went wrong',
      });
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView>
            <Text style={AppTextstyles.heading}>Create Account</Text>
            <Spacer height={8} />
            <Text style={AppTextstyles.subheading}>
              Fill out the form to create your mobile banking account
            </Text>
            <Spacer height={50} />
            <Formik
              validationSchema={validationSchema}
              initialValues={{
                fullname: '',
                username: '',
                accountNo: '',
                password: '',
              }}
              onSubmit={signup}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                touched,
                values,
              }) => (
                <View>
                  <InputField
                    label="Account number"
                    maxLength={10}
                    keyboardType="numeric"
                    onChangeText={handleChange('accountNo')}
                    onBlur={handleBlur('accountNo')}
                    value={values.accountNo}
                    error={touched.accountNo ? errors.accountNo : ''}
                  />
                  <Spacer height={24} />
                  <InputField
                    label="Full name"
                    onChangeText={handleChange('fullname')}
                    onBlur={handleBlur('fullname')}
                    value={values.fullname}
                    error={touched.fullname ? errors.fullname : ''}
                  />
                  <Spacer height={24} />
                  <InputField
                    label="Username"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    error={touched.username ? errors.username : ''}
                  />
                  <Spacer height={24} />

                  <InputField
                    label="Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    error={touched.password ? errors.password : ''}
                    secureTextEntry={secureTextEntry}
                    rightIcon={
                      <VisibilityIcon
                        hidden={secureTextEntry}
                        toggleHidden={() =>
                          setSecureTextEntry(!secureTextEntry)
                        }
                      />
                    }
                  />
                  <Spacer height={70} />
                  <Button
                    onPress={handleSubmit}
                    text="Register"
                    isLoading={isLoading}
                  />
                </View>
              )}
            </Formik>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    paddingHorizontal: 16,
  },
  inner: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 36,
    flex: 1,
    justifyContent: 'space-around',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 50,
  },
  welcomeText: {
    ...AppTextstyles.h1,
    paddingBottom: 24,
    textAlign: 'center',
  },
  passwordContainer: {
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  togglePasswordViewButton: {
    paddingLeft: 12,
    paddingBottom: 12,
  },
  password: {
    alignSelf: 'stretch',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 30,
    height: 100,
    justifyContent: 'flex-end',
  },
  signUpText: {
    ...AppTextstyles.bodySmall,
    paddingBottom: 40,
    paddingTop: 24,
    textAlign: 'center',
  },
});
