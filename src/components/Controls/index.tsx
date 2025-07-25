import React from 'react';
import InputBase from './Input';
import SwitchBase from './Switch';
import SelectBase from './Select';
import { useController } from 'react-hook-form';
import * as S from './style';

type TOption = {
  label?: React.ReactNode;
  value?: string | number;
  children?: TOption[];
};

type TProps = {
  name: string;
  label?: React.ReactNode;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  options?: TOption[];
};

const Control = React.memo<TProps & { control: React.ComponentType<any> }>(
  ({
    name,
    placeholder,
    onChange,
    label,
    disabled,
    children,
    autoFocus,
    control: ControlElement,
    className,
    options,
  }) => {
    const {
      field,
      fieldState: { error },
    } = useController({ name });

    const handleChange = (event) => {
      onChange?.(event);
      field.onChange(event);
    };

    const props = {
      onChange: handleChange,
      disabled,
      error: !!error?.message,
      value: field.value,
      children,
      placeholder,
      autoFocus,
      options,
    };

    return (
      <S.Wrapper className={className}>
        {label && <S.Label>{label}</S.Label>}
        <ControlElement {...props} />
        {error && <S.Error>{error.message}</S.Error>}
      </S.Wrapper>
    );
  }
);

const Input = React.memo<TProps>((props) => (
  <Control {...props} control={InputBase} />
));

const Switch = React.memo<TProps>((props) => (
  <Control {...props} control={SwitchBase} />
));

const Select = React.memo<TProps>((props) => (
  <Control {...props} control={SelectBase} />
));

export { Input, Switch, Select };
