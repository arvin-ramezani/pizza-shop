import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { LoadingBarRef } from 'react-top-loading-bar';

export interface loadingBarState {
  progress: number;
}

const initialState: loadingBarState = {
  progress: 0,
};

export const loadingBarSlice = createSlice({
  name: 'loadingBar',
  initialState,
  reducers: {
    setLoader: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
  },
});

export const { setLoader } = loadingBarSlice.actions;

export const loadingBarSelector = (state: RootState) => state.loadingBar;

export default loadingBarSlice.reducer;
