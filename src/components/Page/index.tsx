import React from 'react';
import * as S from './style';
import Container from '@/components/Container';

type TProps = {
  header?: {
    title?: string;
  };
  className?: string;
} & React.PropsWithChildren;

const Page = React.memo<TProps>(({ className, header, children }) => {
  return (
    <Container className={className}>
      <S.Wrapper>
        {!!header && (
          <S.Header>
            {!!header?.title && <S.Title>{header.title}</S.Title>}
          </S.Header>
        )}
        {!!children && <S.Content>{children}</S.Content>}
      </S.Wrapper>
    </Container>
  );
});

Page.displayName = 'Page';

export default Page;
