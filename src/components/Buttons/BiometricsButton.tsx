import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {FingerprintIcon} from '../../assets';
import {AppColors} from '../../styles/colors';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {useModal} from '../../hooks/useModal';
import ErrorModal from '../Modal';

const BiometricsButton = ({onPress}: {onPress: () => void}) => {
  const rnBiometrics = new ReactNativeBiometrics();
  const {showModal} = useModal();

  const validateBiometrics = async () => {
    const {available, biometryType, error} =
      await rnBiometrics.isSensorAvailable();
    if (error) {
      showModal(ErrorModal, {
        text: 'No biometrics on thie device',
      });
    }
    if (
      available &&
      (biometryType === BiometryTypes.Biometrics ||
        biometryType === BiometryTypes.TouchID)
    ) {
      await rnBiometrics
        .simplePrompt({promptMessage: 'Biometric Login'})
        .then(result => {
          if (result.success) {
            onPress();
          }
        });
    }
  };
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={validateBiometrics}>
      <FingerprintIcon />
    </TouchableOpacity>
  );
};

export default BiometricsButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primary,
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginLeft: 12,
  },
});
