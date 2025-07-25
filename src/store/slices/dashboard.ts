'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '@/store/request';

export enum EArticleGenerationStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING_PAYMENT = 'pending_payment',
  PENDING_ANALYSIS = 'pending_analysis',
}

export type TWebsite = {
  id: number;
  domain: string;
  isArticleGenerationEnabled: boolean;
  isIndexingEnabled: boolean;
  features: {
    articleGeneration?: {
      analyzedLinksCount: number;
      articlesWritten: number;
      status: EArticleGenerationStatus;
      totalArticlesAvailable: number;
    };
    indexing?: {
      status: string;
    };
  };
};

const initialState = {};

const appendWebsite = createAsyncThunk<
  TWebsite,
  {
    domain: string;
    isArticleGenerationEnabled: boolean;
    isIndexingEnabled: boolean;
    isChildren: boolean;
  }
>('dashboard/appendWebsite', (data, api) =>
  request({
    data,
    api,
    method: 'PUT',
    url: '/website',
  })
);

const runBaseAnalysis = createAsyncThunk<unknown, TWebsite>(
  'dashboard/runBaseAnalysis',
  (data, api) =>
    request({
      data,
      api,
      method: 'POST',
      url: `/website/${data.id}/analysis/base/job`,
    })
);

const getWebsites = createAsyncThunk<
  {
    data: TWebsite[];
    total: number;
    page: number;
    pageCount: number;
  },
  {
    isIndexingEnabled?: boolean;
    isArticleGenerationEnabled?: boolean;
    articleGenerationStatus?: string;
    indexingStatus?: string;
    page?: number;
    limit?: number;
  }
>('dashboard/getWebsites', (data, api) =>
  request({
    data,
    api,
    url: '/website',
  })
);

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
});

export { appendWebsite, getWebsites, runBaseAnalysis };

export default dashboardSlice.reducer;
