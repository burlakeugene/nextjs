import React from 'react';
import Illustraiton from '@/assets/illustrations/notFound.svg';
import Button, { ESize as EButtonSize } from '@/components/Button';
import Visibility from '@/components/Visibility';
import * as S from './style';

type TProps = {
  title?: string;
  subtitle?: string;
  text?: string;
  button?: {
    onClick?: () => void;
    text?: React.ReactNode;
  };
  illustration?: TSvgComponent;
  reverse?: boolean;
};

const Empty = React.memo<TProps>(
  ({ title, subtitle, text, button, illustration = Illustraiton, reverse }) => (
    <S.Wrapper reverse={reverse}>
      <Visibility>
        {(props) => <S.Illustration {...props} as={illustration} />}
      </Visibility>
      <Visibility>
        {(props) => (
          <S.Content
            ref={props.ref as React.RefObject<HTMLDivElement>}
            visible={props.visible}
          >
            {!!title && <S.Title>{title}</S.Title>}
            {!!subtitle && <S.SubTitle>{subtitle}</S.SubTitle>}
            {!!text && <S.Text>{text}</S.Text>}
            {!!button && (
              <Button size={EButtonSize.SMALL} onClick={button.onClick}>
                {button?.text}
              </Button>
            )}
          </S.Content>
        )}
      </Visibility>
    </S.Wrapper>
  )
);

Empty.displayName = 'Empty';

export default Empty;
