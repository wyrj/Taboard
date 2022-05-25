import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getName, getUid, initialState, reducers, UserState } from '../features/user/slice';
import { sendApiRequest } from '../api/request';

import type { AppState } from './store';

export const registerUser = createAsyncThunk(
  'user/register',
  (name: string) => sendApiRequest('/api/user/register', { name }),
);
export const checkUser = createAsyncThunk(
  'user/check',
  (uid: string) => sendApiRequest('/api/user/check', { uid }),
);

const user = createSlice({
  name: 'user',
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder
      .addCase(checkUser.fulfilled, (state, { payload }) => {
        if (payload) {
          state.name = payload.name;
          state.uid = payload.uid;
        }
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.name = payload.name;
        state.uid = payload.uid;
        localStorage.setItem('uid', payload.uid);
      });
  },
});

export const getUserName = (state: AppState) => getName(state.user);
export const getUserId = (state: AppState) => getUid(state.user);
export const { setName: setUserName, setUid: setUserId } = user.actions;

export default user;