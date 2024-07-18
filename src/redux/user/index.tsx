import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {User} from '../../services/types';

export const initialState: User = {} as User;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state = action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;

export const getAccounts = (state: RootState) => state.user.accounts;
export const getUser = (state: RootState) => state.user;
export const getUserFullname = (state: RootState) => state.user.fullName;

export default userSlice.reducer;
