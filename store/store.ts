import { configureStore } from '@reduxjs/toolkit';
import user from './userSlice';

function makeStore() {
  return configureStore({
    reducer: {
      user: user.reducer,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store };