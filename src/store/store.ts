import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import donorReducer from './slices/donorSlice';
import ngoReducer from './slices/ngoSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    donor: donorReducer,
    ngo: ngoReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
