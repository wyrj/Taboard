import { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  name: string;
  uid: string;
}

export const initialState: UserState = {
  name: '',
  uid: '',
};

export const getName = (state: UserState) => state.name;
export const getUid = (state: UserState) => state.uid;
export const reducers = {
  setName(state: UserState, { payload: name }: PayloadAction<string>) {
    state.name = name;
  },
  setUid(state: UserState, { payload: uid }: PayloadAction<string>) {
    state.uid = uid;
  },
};
