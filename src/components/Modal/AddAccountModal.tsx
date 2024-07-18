import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {useModal} from '../../hooks/useModal';
import RNModal from 'react-native-modal';
import {useAddNewAccountMutation} from '../../services/api';
import {object, string} from 'yup';
import {InputField} from '../Input';
import {Spacer} from '../spacer';
import {Button} from '../Buttons';
import {Formik, FormikProps} from 'formik';
import {AppColors} from '../../styles/colors';
import {ErrorIcon} from '../../assets/svgs';
import AppTextstyles from '../../styles/textstyles';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getUser, setUser} from '../../redux/user';

type FormValues = {
  accountNo: string;
};
const validationSchema = object({
  accountNo: string().required('Account number is required'),
});
export const AddAccountModal = () => {
  const formRef = useRef<FormikProps<FormValues>>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const {hideModal} = useModal();
  const [addAccountApi] = useAddNewAccountMutation();

  const intialValues: FormValues = {accountNo: ''};

  const submit = async (values: FormValues) => {
    try {
      if (
        user.accounts.filter(account => account.account === values.accountNo)
          .length > 0
      ) {
        setError('This account is already attached to your profile');
        return;
      }
      setIsLoading(true);
      const newUser = await addAccountApi({
        accountno: values.accountNo,
        user,
      }).unwrap();
      if (newUser.data) {
        dispatch(setUser(newUser.data));
        hideModal();
      }
    } catch (e: any) {
      setError(e.errorMessage ?? 'Something went wrong');
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError('');
    formRef.current?.resetForm();
  };
  return (
    <RNModal isVisible={true}>
      <View style={styles.container}>
        {error ? (
          <View>
            <View style={styles.center}>
              <ErrorIcon />
            </View>
            <Spacer height={24} />
            <Text style={styles.heading}>Error</Text>
            <Spacer height={8} />
            <Text style={styles.subheading}>{error}</Text>
            <Spacer height={36} />
            <Button text={'Try again'} onPress={clearError} />
            <Spacer height={8} />
            <Button text={'Cancel'} outline onPress={hideModal} />
          </View>
        ) : (
          <Formik
            validationSchema={validationSchema}
            initialValues={intialValues}
            onSubmit={submit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              values,
            }) => (
              <View>
                <Text style={AppTextstyles.heading}>Add new account</Text>
                <Text style={AppTextstyles.subheading}>
                  Enter the account number you want to add
                </Text>
                <Spacer height={24} />
                <InputField
                  label="Account number"
                  maxLength={10}
                  keyboardType="numeric"
                  onChangeText={handleChange('accountNo')}
                  onBlur={handleBlur('accountNo')}
                  value={values.accountNo}
                  error={touched.accountNo ? errors.accountNo : ''}
                />
                <Spacer height={36} />
                <Button
                  onPress={handleSubmit}
                  text="Continue"
                  isLoading={isLoading}
                />
              </View>
            )}
          </Formik>
        )}
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 10,
  },
  center: {
    alignSelf: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: AppColors.black,
  },
  subheading: {
    fontSize: 14,
    textAlign: 'center',
    color: AppColors.subtext,
  },
});
