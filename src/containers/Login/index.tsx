import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AppTextstyles from '../../styles/textstyles';
import React, {useEffect, useState} from 'react';
import {LoginStackScreenProps} from '../../navigation/stack_types';
import {useAppDispatch} from '../../redux/hooks';
import {Formik} from 'formik';
import {Spacer} from '../../components/spacer';
import {object, string} from 'yup';
import {InputField} from '../../components/Input';
import {Button} from '../../components/Buttons';
import {AppColors} from '../../styles/colors';
import {PressableOpacity} from '../../components/Buttons/PressableOpacity';
import {VisibilityIcon} from '../../components/Visibility';
import BiometricsButton from '../../components/Buttons/BiometricsButton';
import {useModal} from '../../hooks/useModal';
import ErrorModal from '../../components/Modal';
import EncryptedStorage from 'react-native-encrypted-storage';
import {setUser} from '../../redux/user';
import {CommonActions} from '@react-navigation/native';
import {useLoginMutation} from '../../services/api';

type LoginFormValues = {
  username: string;
  password: string;
};
const validationSchema = object({
  username: string().required('Username is required'),
  password: string().required('Password is required'),
});
export const LoginScreen = ({navigation}: LoginStackScreenProps<'Login'>) => {
  const [fullName, setFullname] = useState('');
  const {showModal} = useModal();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const intialValues: LoginFormValues = {username: '', password: ''};

  const [loginApi] = useLoginMutation();

  const loginWithBiometrics = async () => {
    try {
      const result = await EncryptedStorage.getItem('login_data');
      if (result === null) {
        throw new Error();
      }
      const user = JSON.parse(result);
      login({username: user.username, password: user.password});
    } catch (e) {
      showModal(ErrorModal, {
        text: 'You have to login at least once to use biometrics',
      });
    }
  };

  const login = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      const result = await loginApi({
        username: values.username,
        password: values.password,
      }).unwrap();
      if (result.data !== undefined) {
        await EncryptedStorage.setItem(
          'login_date',
          JSON.stringify({
            username: result.data.username,
            fullname: result.data.fullName,
            password: result.data.password,
          }),
        );
        dispatch(setUser(result.data));
        navigation.dispatch(
          CommonActions.reset({
            routes: [{name: 'AppStack', params: {screen: 'Dashboard'}}],
          }),
        );

        if (!result.isSuccess) {
          showModal(ErrorModal, {
            text: result.errorMessage ?? 'Something went wrong',
          });
        }
        setLoading(false);
      }
    } catch (e: any) {
      console.log(e);

      showModal(ErrorModal, {
        text: e.errorMessage ?? 'Something went wrong',
      });
      setLoading(false);
    }
  };
  const initialize = async () => {
    const result = await EncryptedStorage.getItem('login_data');
    if (result !== null) {
      const user = JSON.parse(result);
      setFullname(user.fullname);
    }
  };
  useEffect(() => {
    initialize();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView>
            <Text style={AppTextstyles.heading}>Login</Text>
            <Spacer height={8} />
            <Text style={AppTextstyles.subheading}>
              {fullName
                ? `Welcome Back ${fullName}!`
                : 'Welcome to Kanma Banking!'}
            </Text>
            <Spacer height={50} />
            <Formik
              validationSchema={validationSchema}
              initialValues={intialValues}
              onSubmit={login}>
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
                  <PressableOpacity>
                    <Text style={styles.forgotPassword}>Forgot Password</Text>
                  </PressableOpacity>
                  <Spacer height={70} />
                  <View style={styles.row}>
                    <Button
                      onPress={handleSubmit}
                      text="Login"
                      isLoading={isLoading}
                      style={styles.fill}
                    />
                    <BiometricsButton onPress={loginWithBiometrics} />
                  </View>
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
  forgotPassword: {
    fontSize: 13,
    fontWeight: '500',
    color: AppColors.primary,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
  },
  fill: {
    flex: 1,
  },
});
