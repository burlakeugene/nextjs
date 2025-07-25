import React from 'react';
import * as S from './style';
import Panel from './components/Panel';
import Content from './components/Content';
import { useAppSelector } from '@/store/hooks';

const Auth = () => {
  const auth = useAppSelector((state) => state.auth);

  return (
    <S.Wrapper id="auth">
      <S.Container>
        {!auth.data ? (
          <>
            <Panel />
            <Content />
          </>
        ) : (
          <Content />
        )}
      </S.Container>
    </S.Wrapper>
  );
};

Auth.displayName = 'Auth';

export default Auth;
