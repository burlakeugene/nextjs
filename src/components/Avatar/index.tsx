import React from 'react';
import * as S from './style';
import Icon from '@/components/Icon';
import UserIcon from '@/assets/icons/user.svg';

type TProps = {
  name?: string;
  url?: string | null;
  className?: string;
  onClick?: () => void;
};

const Avatar = React.memo<TProps>(({ name, url, className, onClick }) => {
  const text = React.useMemo(
    () =>
      name
        ?.split(' ')
        .map((string) => string[0])
        .slice(0, 2)
        .join('') || null,
    [name]
  );

  return (
    <S.Wrapper className={className} onClick={onClick}>
      {text ? text : <Icon style={{ width: 24 }} as={UserIcon} />}
      {url && <S.Image src={url} />}
    </S.Wrapper>
  );
});

export default Avatar;
