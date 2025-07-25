'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TState = {
  loading: boolean;
};

const initialState: TState = {
  loading: true,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
});

export const { setLoading } = uiSlice.actions;

export default uiSlice.reducer;
