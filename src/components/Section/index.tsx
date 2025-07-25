import React from 'react';
import * as S from './style';
import { EType } from './types';
import Circles from '@/components/Circles';

export { EType };

type TProps = {
  title?: string;
  type?: EType;
  className?: string;
} & React.PropsWithChildren;

const Section = React.memo<TProps>(
  ({ className, title, children, type = EType.DEFAULT }) => {
    return (
      <S.Wrapper className={className} type={type}>
        {type === EType.FLOAT && <Circles />}
        <S.Content>
          {!!title && <S.Title>{title}</S.Title>}
          {children}
        </S.Content>
      </S.Wrapper>
    );
  }
);

Section.displayName = 'Section';

export default Section;
