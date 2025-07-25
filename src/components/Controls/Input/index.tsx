import React from 'react';
import * as S from './style';

export type TProps = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  value: string | number;
  error?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
};

const Input = React.memo<TProps>(
  ({ placeholder, disabled, onChange, error, value, autoFocus, className }) => (
    <S.Input
      className={className}
      onChange={onChange}
      error={error}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      autoFocus={autoFocus}
    />
  )
);

export default Input;
