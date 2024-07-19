import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleProp,
  TextStyle,
  TextInputProps,
  StyleSheet,
  Text,
} from 'react-native';
import {AppColors} from '../../styles/colors';
import AppTextstyles from '../../styles/textstyles';

export type InputFieldProps = Omit<TextInputProps, 'onChangeText'> & {
  onChangeText: (text: string) => void;
  onChange?: (text: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode[] | React.ReactNode;
  isFocused?: boolean;
  inputRef?: React.RefObject<TextInput>;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  showLabel?: boolean;
};

export const RenderLabel = (label: string, focused: boolean) => (
  <Text
    style={[
      stylesInput.inputLabel,
      {color: focused ? AppColors.primary : AppColors.black},
    ]}>
    {label}
  </Text>
);

export const RenderBottomError = (error: string) => (
  <View style={stylesInput.bottomInfoContainer}>
    <Text style={[AppTextstyles.bodySmall, {color: AppColors.error}]}>
      {error || ' '}
    </Text>
  </View>
);

export const RenderBaseInput = ({
  error,
  style,
  placeholder,
  onChange,
  isFocused,
  inputRef,
  rightIcon,
  leftIcon,
  onChangeText,
  editable = true,
  ...restProps
}: InputFieldProps) => {
  const [showErrorBorder, setShowErrorBorder] = useState(false);

  const baseInputStyles = [
    stylesInput.baseContainer,
    !!error && showErrorBorder && stylesInput.error,
    isFocused && stylesInput.bordered,
    !editable && stylesInput.disabled,
    style,
  ];

  useEffect(() => {
    if (!!error && !isFocused) {
      setShowErrorBorder(true);
    }
    if (isFocused) {
      setShowErrorBorder(false);
    }
  }, [isFocused, error]);

  return (
    <View style={[baseInputStyles]}>
      {leftIcon && <View style={stylesInput.iconLeftWrapper}>{leftIcon}</View>}
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        style={[
          stylesInput.baseTextInput,
          !editable && {color: AppColors.grey200},
          {},
        ]}
        placeholderTextColor={AppColors.subtext}
        cursorColor={AppColors.primary}
        selectionColor={AppColors.grey100}
        onChangeText={val => {
          onChangeText(val);
          onChange && onChange(val);
        }}
        editable={editable}
        {...restProps}
      />
      {rightIcon && (
        <View style={stylesInput.iconRightWrapper}>{rightIcon}</View>
      )}
    </View>
  );
};

export const InputField = (props: InputFieldProps) => {
  return (
    <View>
      {props.label && RenderLabel(props.label, props.isFocused || false)}
      {RenderBaseInput(props)}
      {!!props.error && RenderBottomError(props.error)}
      {props.children}
    </View>
  );
};

const stylesInput = StyleSheet.create({
  baseContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  bordered: {
    borderWidth: 2,
    borderColor: AppColors.primary,
  },
  baseTextInput: {
    flex: 1,
    ...AppTextstyles.body,
    paddingVertical: 12,
  },
  error: {
    borderWidth: 2,
    borderColor: AppColors.error,
  },
  iconRightWrapper: {
    paddingLeft: 8,
  },
  iconLeftWrapper: {
    paddingRight: 8,
  },
  inputLabel: {
    marginBottom: 8,
    ...AppTextstyles.body,
  },
  bottomInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  disabled: {
    backgroundColor: AppColors.grey200,
    borderColor: AppColors.grey300,
  },
});
