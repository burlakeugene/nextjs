'use client';

import React from 'react';
import * as S from './style';
import Auth from './components/Auth';

const Home = React.memo(() => (
  <S.Wrapper>
    <Auth />
  </S.Wrapper>
));

Home.displayName = 'Home';

export default Home;
