import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {RootStackScreenProps} from '../../navigation/stack_types';
import {Button} from '../../components/Buttons';
import {Spacer} from '../../components/spacer';
import AppTextstyles from '../../styles/textstyles';

export const WelcomeScreen = ({
  navigation,
}: RootStackScreenProps<'Welcome'>) => {
  const {width} = useWindowDimensions();

  const goToRegister = () => {
    navigation.navigate('LoginStack', {
      screen: 'Signup',
    });
  };
  const goToLogin = () => {
    navigation.navigate('LoginStack', {
      screen: 'Login',
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
      <Spacer flex={1} />
      <Image
        source={require('../../assets/images/welcome.png')}
        style={[{width, height: width * 0.8197}, styles.image]}
      />
      <View style={styles.buttonContainer}>
        <Text style={styles.headerText}>Welcome to Kanma Mobile Banking</Text>
        <Text style={styles.subText}>
          Carry out your daily banking transactions easily from the comfort of
          your mobile devices
        </Text>
        <Spacer height={50} />
        <Button text="Register" onPress={goToRegister} />
        <Spacer height={24} />
        <Button text="Login" outline onPress={goToLogin} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  logo: {
    width: 180,
    height: 30,
    alignSelf: 'center',
  },
  image: {
    objectFit: 'cover',
  },
  headerText: {
    textAlign: 'center',
    ...AppTextstyles.heading,
  },
  subText: {
    textAlign: 'center',
    ...AppTextstyles.subheading,
  },
});
