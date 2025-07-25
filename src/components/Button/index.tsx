import React, { PropsWithChildren } from 'react';
import noop from 'lodash/noop';
import { EAppearance, EColor, ESize } from './types';
import * as S from './style';

export { EAppearance, EColor, ESize };

type TProps = {
  onClick?: (event: React.MouseEvent) => void;
  appearance?: EAppearance;
  size?: ESize;
  color?: EColor;
  disabled?: boolean;
  className?: string;
  wide?: boolean;
} & PropsWithChildren;

const Button = React.memo<TProps>(
  ({
    className,
    children,
    onClick = noop,
    appearance = EAppearance.PRIMARY,
    size = ESize.DEFAULT,
    color = EColor.THEME,
    disabled,
    wide,
  }) => {
    return (
      <S.Button
        className={className}
        disabled={disabled}
        appearance={appearance}
        onClick={onClick}
        wide={wide}
        color={color}
        size={size}
      >
        {children}
      </S.Button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
