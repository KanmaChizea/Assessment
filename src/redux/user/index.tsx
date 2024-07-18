import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {User} from '../../services/types';

type UserState = {
  user: User;
};
export const initialState: UserState = {} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;

export const getAccounts = (state: RootState) => state.user.user.accounts;
export const getUser = (state: RootState) => state.user.user;
export const getUserFullname = (state: RootState) => state.user.user.fullName;

export default userSlice.reducer;
