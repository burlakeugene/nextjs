import React from 'react';
import * as S from './style';

type TProps = {
  withLabel?: boolean;
  big?: boolean;
};

const Logo = ({ withLabel, big }: TProps) => (
  <S.Wrapper big={big} href="/">
    <S.Icon>{'</>'}</S.Icon>
    {withLabel && 'SEO Bot'}
  </S.Wrapper>
);

export default Logo;
