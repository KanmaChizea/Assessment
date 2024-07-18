import {
  ColorValue,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {AppColors} from '../../styles';
import {PressableOpacity} from '../../components/Buttons/PressableOpacity';

export type ButtonProps = {
  text?: string;
  color?: ColorValue;
  textColor?: ColorValue;
  small?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  outline?: boolean;
};
export const Button = ({
  text,
  color,
  textColor,
  small,
  onPress,
  disabled = false,
  style,
  buttonStyle,
  outline = false,
}: ButtonProps) => {
  const backgroundColor = color || AppColors.primary;
  return (
    <View style={[small && styles.small, style]}>
      <PressableOpacity
        style={[
          {
            backgroundColor: disabled ? AppColors.grey200 : backgroundColor,
          },
          styles.button,
          outline && {...styles.outline, borderColor: backgroundColor},
          buttonStyle,
        ]}
        activeOpacity={disabled ? 1 : undefined}
        onPress={disabled ? null : onPress}>
        <Text
          style={[
            styles.textstyle,
            {color: textColor || (outline ? backgroundColor : AppColors.white)},
          ]}>
          {text ?? ''}
        </Text>
      </PressableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  small: {
    alignSelf: 'center',
  },
  outline: {
    borderWidth: 1.5,
    backgroundColor: AppColors.transparent,
  },
  textstyle: {
    fontWeight: '600',
    fontSize: 16,
  },
});
