import React from 'react';
import * as S from './style';

type TProps = {
  count?: number;
  className?: string;
};
const Circles = React.memo<TProps>(({ className, count = 6 }) => (
  <S.Wrapper className={className}>
    {Array.from({ length: count }).map((_, index) => {
      const size = 2 + Math.random() * 5;
      const delay = Math.random() * 10;
      const left = Math.random() * 100;
      const duration = 10 + (7 - size) * 5;
      const blur = 2 + (7 - size) * 0.7;

      return (
        <S.Circle
          key={index}
          style={{
            width: `${size}%`,
            paddingBottom: `${size}%`,
            left: `${left}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            filter: `blur(${blur}px)`,
          }}
        />
      );
    })}
  </S.Wrapper>
));

export default Circles;
