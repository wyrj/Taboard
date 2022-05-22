import { configureStore } from '@reduxjs/toolkit';

function makeStore() {
  return configureStore({
    reducer: {
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store };