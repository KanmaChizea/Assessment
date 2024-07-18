import {StyleSheet} from 'react-native';
import {AppColors} from './colors';

export const AppTextstyles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.black,
  },
  subheading: {
    fontSize: 12,
    color: AppColors.subtext,
  },
  body: {fontSize: 14, color: AppColors.black},
  bodySmall: {
    fontSize: 12,
    color: AppColors.black,
  },
  h1: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.black,
  },
  h2: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  h4: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  h5: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  h6: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  bodyLargeBold: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  bodyLargeMedium: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  bodyLarge: {
    fontSize: 16,
    color: '#333333',
  },
  bodySmallBold: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  bodySmallMedium: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },

  caption: {
    fontSize: 12,
    color: '#666666',
  },
});

export default AppTextstyles;
