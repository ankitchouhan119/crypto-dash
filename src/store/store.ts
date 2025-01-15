import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './cryptoSlice.ts';
import layoutReducer from './layoutSlice.ts';
import themeReducer from './themeSlice.ts';

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    layout: layoutReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

