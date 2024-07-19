import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import AppTextstyles from '../styles/textstyles';
import {dashboardActions} from '../constants/actions';
import {useAppSelector} from '../redux/hooks';
import {getAccounts, getUserFullname} from '../redux/user';
import {AppStackScreenProps} from '../navigation/stack_types';
import {getInitials} from '../services/utils';
import {AppColors} from '../styles/colors';
import {LogoutIcon} from '../assets';
import {PressableOpacity} from '../components/Buttons/PressableOpacity';
import {Spacer} from '../components/spacer';
import {CarouselDots} from '../components/CarouselDots';
import {useCarousel} from '../hooks/carousel';
import {CommonActions} from '@react-navigation/native';
import AccountCard from '../components/AccountBalanceCard';
import {DashboardActionCard} from '../components/DashboardActionCard';

const spacer = () => <Spacer width={24} />;
const Dashboard = ({navigation}: AppStackScreenProps<'Dashboard'>) => {
  const name = useAppSelector(getUserFullname);
  const myAccounts = useAppSelector(getAccounts);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatList = useRef<FlatList>(null);
  const {onLayout, onMomentumScrollEnd, size} = useCarousel(
    flatList,
    activeIndex,
    setActiveIndex,
  );
  const logout = () => {
    navigation.dispatch(
      CommonActions.reset({
        routes: [
          {name: 'Welcome'},
          {name: 'LoginStack', params: {screen: 'Login'}},
        ],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.appBar}>
        <View style={styles.row}>
          <View style={styles.initialsContainer}>
            <Text style={styles.initials}>{getInitials(name)}</Text>
          </View>
          <Text style={AppTextstyles.bodyMedium}>{`Hello ${name}`}</Text>
        </View>
        <PressableOpacity onPress={logout}>
          <LogoutIcon />
        </PressableOpacity>
      </SafeAreaView>
      <FlatList
        ref={flatList}
        data={myAccounts}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onLayout={onLayout}
        snapToInterval={size.width + 24}
        onMomentumScrollEnd={onMomentumScrollEnd}
        initialNumToRender={myAccounts.length}
        keyExtractor={item => item.accountNumber}
        ItemSeparatorComponent={spacer}
        renderItem={({item}) => <AccountCard account={item} />}
        ListEmptyComponent={
          <Text>No account associated with this account</Text>
        }
      />
      {myAccounts.length > 0 && (
        <CarouselDots activeIndex={activeIndex} length={myAccounts.length} />
      )}
      <Spacer height={27} />
      <Text style={styles.accountsText}>Quick Actions</Text>
      <FlatList
        data={dashboardActions}
        renderItem={({item}) => (
          <DashboardActionCard action={item} onPress={() => {}} />
        )}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  accountsText: {
    ...AppTextstyles.h5,
    paddingBottom: 28,
  },
  initials: {
    ...AppTextstyles.bodyMedium,
    color: AppColors.primary,
  },
  initialsContainer: {
    marginRight: 8,
    borderRadius: 100,
    width: 30,
    height: 30,
    backgroundColor: '#FFDFDF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 12, // Add horizontal spacing between items
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 36,
  },
});
