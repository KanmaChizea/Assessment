import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import {AppColors} from '../../styles/colors';
import AppTextstyles from '../../styles/textstyles';
import {Account} from '../../services/types';
import {Spacer} from '../spacer';
import {PressableOpacity} from '../Buttons/PressableOpacity';
import {AddAccountIcon, Visibility, VisibilityOff} from '../../assets';
import LinearGradient from 'react-native-linear-gradient';
import {useModal} from '../../hooks/useModal';
import {AddAccountModal} from '../Modal/AddAccountModal';

const AccountCard = ({account}: {account: Account}) => {
  const [showBalance, setShowBalance] = useState(true);
  const {width} = useWindowDimensions();
  const {showModal} = useModal();

  const addAccount = () => {
    showModal(AddAccountModal, {});
  };
  return (
    <LinearGradient
      colors={[AppColors.primary, '#820202']}
      style={[styles.container, {width: width - 32}]}>
      <View style={styles.top}>
        <View>
          <Text style={[AppTextstyles.body, {color: AppColors.grey100}]}>
            Savings Account
          </Text>
          <Spacer height={6} />
          <Text style={[AppTextstyles.body, {color: AppColors.white}]}>
            {account.account}
          </Text>
        </View>
        <PressableOpacity style={styles.addAccount} onPress={addAccount}>
          <AddAccountIcon />
          <Spacer width={8} />
          <Text style={styles.smallText}>Add account</Text>
        </PressableOpacity>
      </View>
      <Spacer height={36} />
      <View style={styles.bottom}>
        <View>
          <Text style={styles.balance}>
            {showBalance
              ? new Intl.NumberFormat('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                }).format(account.balance)
              : '*****'}
          </Text>
          <Spacer height={6} />
          <Text style={[AppTextstyles.bodySmall, {color: AppColors.grey100}]}>
            Available balance
          </Text>
        </View>
        <PressableOpacity
          style={styles.row}
          onPress={() => setShowBalance(!showBalance)}>
          <Text style={styles.smallText}>{`${
            showBalance ? 'Hide' : 'Show'
          } balance`}</Text>
          <Spacer width={7} />
          {showBalance ? (
            <Visibility width={16} style={{color: AppColors.white}} />
          ) : (
            <VisibilityOff width={16} style={{color: AppColors.white}} />
          )}
        </PressableOpacity>
      </View>
    </LinearGradient>
  );
};

export default AccountCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  addAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 7,
    borderRadius: 10,
    borderColor: AppColors.white,
  },
  balance: {
    fontSize: 18,
    fontWeight: '700',
    color: AppColors.white,
  },
  smallText: {
    fontSize: 10,
    color: AppColors.white,
  },
});
