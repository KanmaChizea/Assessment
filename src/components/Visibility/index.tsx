import React from 'react';
import {Visibility, VisibilityOff} from '../../assets/svgs';
import {PressableOpacity} from '../Buttons/PressableOpacity';

type Props = {
  hidden: boolean;
  toggleHidden: () => void;
};
export const VisibilityIcon = ({hidden, toggleHidden}: Props) => (
  <PressableOpacity onPress={toggleHidden}>
    {hidden ? <VisibilityOff /> : <Visibility />}
  </PressableOpacity>
);
