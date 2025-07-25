import React from 'react';
import * as S from './style';
import TelegramIcon from '@/assets/logos/telegram.svg';
import YoutubeIcon from '@/assets/logos/youtube.svg';
import Icon from '@/components/Icon';
import { EType } from './types';

const Socials = React.memo(() => {
  const list = React.useMemo(() => {
    return [
      {
        link: 'http://telegram.org',
        icon: TelegramIcon,
        title: 'telegram',
        type: EType.TELEGRAM,
      },
      {
        link: 'http://youtube.org',
        icon: YoutubeIcon,
        title: 'youtube',
        type: EType.YOUTUBE,
      },
    ];
  }, []);

  return (
    <S.Wrapper>
      {list.map((item, index) => (
        <S.Item
          type={item.type}
          href={item.link}
          target="_blank"
          key={index}
          title={item.title}
        >
          <Icon style={{ width: 24 }} as={item.icon} />
        </S.Item>
      ))}
    </S.Wrapper>
  );
});

Socials.displayName = 'Socials';

export default Socials;
