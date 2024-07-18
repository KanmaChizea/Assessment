import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useModal} from '../../hooks/useModal';
import RNModal from 'react-native-modal';
import {Button} from '../Buttons';
import {Spacer} from '../spacer';
import {ErrorIcon, SuccessIcon} from '../../assets/svgs';
import {AppColors} from '../../styles/colors';

type Props = {
  text: string;
  type?: 'success' | 'error';
  buttonText?: string;
  onCancel?: () => void;
};
const Modal = ({text, type = 'error', buttonText = 'Okay'}: Props) => {
  const {hideModal} = useModal();
  return (
    <RNModal isVisible={true}>
      <View style={styles.container}>
        <View style={styles.center}>
          {type === 'success' ? <SuccessIcon /> : <ErrorIcon />}
        </View>
        <Spacer height={24} />
        <Text style={styles.heading}>
          {type === 'success' ? 'Success' : 'Error'}
        </Text>
        <Spacer height={8} />
        {text && <Text style={styles.subheading}>{text}</Text>}
        <Spacer height={36} />
        <Button text={buttonText} onPress={hideModal} />
      </View>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: AppColors.white,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 10,
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
  center: {
    alignSelf: 'center',
  },
});
