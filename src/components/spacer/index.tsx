import React from 'react';
import {View, ViewProps} from 'react-native';

type Props = ViewProps & {
  flex?: number;
  width?: number;
  height?: number;
};

export const Spacer = ({flex = 0, width = 0, height = 0, ...props}: Props) => {
  return (
    <View
      style={{
        flex,
        width: width,
        height: height,
      }}
      {...props}
    />
  );
};
