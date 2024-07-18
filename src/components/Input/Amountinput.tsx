import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import { InputFieldProps, RenderBottomError, RenderLabel } from '@/Components/Input';
import CurrencyInput from 'react-native-currency-input';
import { stylesInput } from '@/Components/Input/styles';
import { COLORS } from '@/Theme/Colors';
import { Typography } from '@/Components/Typography';
import { useScaling } from '@/Hooks/useScaling';

export type AmountInputProps = Omit<InputFieldProps, 'value'> & {
  value: number;
};
export const AmountInput = ({
  value,
  onChangeText,
  editable = true,
  onFocus,
  onBlur,
  label,
  placeholder,
  isFocused = false,
  error,
  style,
}: AmountInputProps) => {
  const { scaleHorizontal, scaleVertical } = useScaling();
  const onChangeValue = (val: number | null) => {
    onChangeText(val?.toString() || '');
  };
  const baseInputStyles: StyleProp<ViewStyle> = [
    stylesInput.baseContainer({ scaleVertical, scaleHorizontal }),
    isFocused && stylesInput.bordered,
    !!error && stylesInput.error,
    !editable && stylesInput.disabled,
    {
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingVertical: 0,
      alignItems: 'center',
    },
  ];

  return (
    <View style={style}>
      {label && RenderLabel(label, isFocused, !!error)}
      <View style={baseInputStyles}>
        <Typography>{'₦'}</Typography>
        <CurrencyInput
          value={value}
          editable={editable}
          onChangeValue={onChangeValue}
          delimiter=","
          precision={0}
          placeholder={placeholder}
          style={[
            styles.baseTextInput,
            { fontSize: scaleHorizontal(14), paddingVertical: scaleVertical(16) - 5 },
          ]}
          placeholderTextColor={COLORS.GREY_600}
          selectionColor={COLORS.BLUE}
          keyboardType="decimal-pad"
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </View>
      {!!error && RenderBottomError(error)}
    </View>
  );
};

const styles = StyleSheet.create({
  baseTextInput: {
    fontFamily: 'Montserrat-Regular',
    color: COLORS.BLACK,
    flex: 1,
  },
});
