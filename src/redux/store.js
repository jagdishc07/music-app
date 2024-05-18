import { configureStore } from '@reduxjs/toolkit';
import { soundCloudApi } from './services/soundCloud';
import playerReducer from './features/playerSlice';

export const store = configureStore({
  reducer: {
    [soundCloudApi.reducerPath]: soundCloudApi.reducer,
    player: playerReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(soundCloudApi.middleware)
});
