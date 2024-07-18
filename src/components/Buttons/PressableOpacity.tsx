import React from 'react';
import {Pressable, PressableProps, ViewStyle} from 'react-native';

export type PressableOpacityProps = PressableProps & {
  activeOpacity?: number;
};

export const PressableOpacity = ({
  children,
  disabled,
  style,
  onPress,
  activeOpacity = 0.6,
  ...props
}: PressableOpacityProps) => {
  return (
    <Pressable
      style={({pressed}) => [
        {opacity: pressed ? activeOpacity : 1},
        style as ViewStyle,
      ]}
      hitSlop={5}
      disabled={disabled}
      onPress={onPress}
      {...props}>
      {children}
    </Pressable>
  );
};
