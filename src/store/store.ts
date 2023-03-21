import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import weatherSlice from './slice';

export const store = configureStore({
  reducer: { weather: weatherSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
