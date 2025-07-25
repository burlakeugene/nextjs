import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/auth';
import ui from './slices/ui';
import websocketMiddleware from './middleware/websocket';

const store = configureStore({
  reducer: {
    auth,
    ui,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware),
});

export default store;

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
