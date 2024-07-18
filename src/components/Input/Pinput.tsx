import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { COLORS } from '@/Theme/Colors';
import { Typography } from '@/Components/Typography';

type PinputProps = {
  value: string;
  setValue: (value: string) => void;
};
export const Pinput = ({ value, setValue }: PinputProps) => {
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <CodeField
      ref={ref}
      {...props}
      // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
      value={value}
      onChangeText={setValue}
      cellCount={4}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      autoFocus={true}
      renderCell={({ index, symbol, isFocused }) => (
        <Typography
          key={index}
          style={[styles.cell, isFocused && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}
        >
          {symbol}
        </Typography>
      )}
    />
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 52,
    height: 52,
    lineHeight: 52,
    fontSize: 14,
    marginHorizontal: 8,
    textAlign: 'center',
    borderRadius: 5,
    borderWidth: 1,
  },
  focusCell: {
    borderWidth: 2,
    borderColor: COLORS.YELLOW,
  },
});
