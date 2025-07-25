import React from 'react';
import * as S from './style';

const Skeleton = ({
  columns = 1,
  height = '30px',
  borderRadius = '8px',
  width = '',
  className = '',
}) => {
  return (
    <S.Wrapper className={className}>
      {Array.from({ length: columns }, (_, index) => (
        <S.Item
          key={index}
          style={{
            height,
            borderRadius,
            ...(width
              ? {
                  minWidth: width,
                  maxWidth: width,
                }
              : {}),
          }}
        />
      ))}
    </S.Wrapper>
  );
};

export default Skeleton;
