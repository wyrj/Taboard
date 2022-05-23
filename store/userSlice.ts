import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getName, getUid, initialState, reducers, UserState } from '../features/user/slice';

import type { AppState } from './store';

export const registerUser = createAsyncThunk(
  'user/register',
  async (name: string) => {
    const res = await fetch('/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    const result = await res.json();
    return result;
  }
);

const user = createSlice({
  name: 'user',
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, { payload }: PayloadAction<UserState>) => {
        state.name = payload.name;
        state.uid = payload.uid;
      });
  },
});

export const getUserName = (state: AppState) => getName(state.user);
export const getUserId = (state: AppState) => getUid(state.user);
export const { setName: setUserName, setUid: setUserId } = user.actions;

export default user;