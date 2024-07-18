import React from 'react';
import {ModalContext} from '../redux/providers/modal';

export const useModal = () => React.useContext(ModalContext);
