import React from 'react';
import {Visibility, VisibilityOff} from '../../assets/svgs';
import {PressableOpacity} from '../Buttons/PressableOpacity';
import {AppColors} from '../../styles/colors';

type Props = {
  hidden: boolean;
  toggleHidden: () => void;
};
export const VisibilityIcon = ({hidden, toggleHidden}: Props) => (
  <PressableOpacity onPress={toggleHidden}>
    {hidden ? (
      <VisibilityOff style={{color: AppColors.subtext}} />
    ) : (
      <Visibility style={{color: AppColors.subtext}} />
    )}
  </PressableOpacity>
);
