import { RootState } from '../store';
import { createSlice } from '@reduxjs/toolkit';

export interface authState {
  showModal: boolean;
}

const initialState: authState = {
  showModal: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.showModal = !state.showModal;
    },
  },
});

export const { toggleModal } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
