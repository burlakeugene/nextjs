import React from 'react';
import * as S from './style';

export type TProps = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  error?: boolean;
  value?: boolean;
};

const Switch = React.memo<TProps>(
  ({ children, value, onChange, disabled, error }) => {
    return (
      <S.Wrapper error={error} disabled={disabled}>
        <S.Input
          disabled={disabled}
          type="checkbox"
          checked={value}
          onChange={onChange}
        />
        <S.Control />
        {children}
      </S.Wrapper>
    );
  }
);

export default Switch;
