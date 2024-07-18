import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../redux/user/index';
import {rtkQueryService} from '../services/api';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [rtkQueryService.reducerPath]: rtkQueryService.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([rtkQueryService.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
