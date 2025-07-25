import React from 'react';
import { EType } from './types';
import WarningIcon from '@/assets/icons/warning.svg';
import InfoIcon from '@/assets/icons/info.svg';
import ErrorIcon from '@/assets/icons/error.svg';
import * as S from './style';
import IconBase from '@/components/Icon';

export { EType };

type TProps = React.PropsWithChildren & {
  type?: EType;
};
const Panel = React.memo<TProps>(({ children, type = EType.INFO }) => {
  const Icon = React.useMemo(() => {
    switch (type) {
      case EType.WARNING:
        return WarningIcon;
      case EType.ERROR:
        return ErrorIcon;
      default:
        return InfoIcon;
    }
  }, [type]);

  return (
    <S.Wrapper type={type}>
      <IconBase style={{ width: 24, marginTop: -3 }} as={Icon} />
      {children}
    </S.Wrapper>
  );
});

export default Panel;
