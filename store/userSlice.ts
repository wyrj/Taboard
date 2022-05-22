import { createSlice } from '@reduxjs/toolkit';
import { getName, getUid, initialState, reducers } from '../features/user/slice';

import type { AppState } from './store';

const user = createSlice({
  name: 'user',
  initialState,
  reducers,
});

export const getUserName = (state: AppState) => getName(state.user);
export const getUserId = (state: AppState) => getUid(state.user);
export const { setName: setUserName, setUid: setUserId } = user.actions;

export default user;