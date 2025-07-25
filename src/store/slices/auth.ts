'use client';

import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  isAnyOf,
} from '@reduxjs/toolkit';
import request from '@/store/request';
import { getCookie, removeCookie, setCookie } from '@/utils';

const TOKEN_KEY = 'token';

export enum EOAuth {
  GOOGLE = 'google',
  YANDEX = 'yandex',
}

export type TProfile = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  isFilled?: boolean;
};

type TState = {
  data?: TProfile;
  token?: string | null;
};

const initialToken = getCookie(TOKEN_KEY) || null;

const initialState: TState = initialToken ? { token: initialToken } : {};

const getProfile = createAsyncThunk<TProfile>('auth/getProfile', (_, api) =>
  request({
    api,
    url: '/user/me',
  })
);

const getCode = createAsyncThunk<unknown, { email: string }>(
  'auth/getCode',
  (data, api) =>
    request({
      api,
      url: '/auth/code/request',
      method: 'POST',
      data,
    })
);

const validateCode = createAsyncThunk<
  { accessToken: string },
  { email: string; code: string }
>('auth/validateCode', (data, api) =>
  request({
    api,
    url: '/auth/code/validate',
    method: 'POST',
    data,
  })
);

const updateProfile = createAsyncThunk<TProfile, TProfile>(
  'auth/updateProfile',
  (data, api) =>
    request({
      api,
      data,
      method: 'PATCH',
      url: '/user/me',
    })
);

const getOAuth = createAsyncThunk<{ url: string }, { provider: EOAuth }>(
  'auth/getOAuth',
  (data, api) =>
    request({
      api,
      data,
      url: '/auth/oauth/url',
    })
);

const logoutBase = () => {
  removeCookie(TOKEN_KEY);

  return {};
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutSilence: () => logoutBase(),
    setToken: (state, action: PayloadAction<string>) => {
      setCookie(TOKEN_KEY, action.payload);

      return {
        ...state,
        token: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(getProfile.fulfilled, updateProfile.fulfilled),
      (state, action) => ({
        ...state,
        data: action.payload,
      })
    );
  },
});

export const { logoutSilence, setToken } = authSlice.actions;

export { getProfile, getCode, validateCode, updateProfile, getOAuth };

export default authSlice.reducer;
