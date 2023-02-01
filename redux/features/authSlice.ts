import { RootState } from '../store';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserPlaceList {
  id: string;
  placeAddress: string;
  placeLocation: { lng: number; lat: number };
  placeName: string;
  user: string;
}
interface GetMeApiResponse {
  user: {
    firstName: string;
    lastName?: string;
    email: string;
    phone: string;
    image?: string;
    id: string;
  };
  userPlaces: UserPlaceList[];
}

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
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.showModal = !state.showModal;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleModal } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
