'use client';

import React from 'react';
import { useAppSelector } from '@/store/hooks';
import * as S from './style';

const Loader = React.memo(() => {
  const loading = useAppSelector((state) => state.ui.loading);

  return <S.Loading full overlay visible={loading} />;
});

Loader.displayName = 'Loader';

export default Loader;
