import {StyleSheet, View} from 'react-native';
import React from 'react';
import {AppColors} from '../../styles/colors';

type Props = {
  length: number;
  activeIndex: number;
};
export const CarouselDots = ({activeIndex, length}: Props) => {
  const renderDots = () => {
    const dots = [];

    for (let i = 0; i < length; i++) {
      dots.push(
        <View
          key={i}
          style={[styles.dot, i === activeIndex && styles.active]}
        />,
      );
    }

    return dots;
  };
  return <View style={styles.container}>{length > 1 && renderDots()}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: AppColors.grey200,
  },
  active: {
    width: 16,
    backgroundColor: AppColors.primary,
  },
});
