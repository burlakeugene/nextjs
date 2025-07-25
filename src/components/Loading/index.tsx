import React from 'react';
import LoadingIcon from '@/assets/icons/loading.svg';
import Icon from '@/components/Icon';
import * as S from './style';

type TProps = {
  overlay?: boolean;
  full?: boolean;
  className?: string;
  visible?: boolean;
};

const Loading = React.memo<TProps>(({ overlay, full, className, visible }) => (
  <S.Wrapper
    overlay={overlay}
    full={full}
    visible={visible}
    className={className}
  >
    <Icon
      as={LoadingIcon}
      style={{
        width: 24,
      }}
    />
  </S.Wrapper>
));

Loading.displayName = 'Loading';

export default Loading;
