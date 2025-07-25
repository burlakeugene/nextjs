import React from 'react';
import * as S from './style';

import Visibility from '@/components/Visibility';
import Icon from '@/components/Icon';
import CheckedIcon from '@/assets/icons/checked.svg';
import Logo from '@/components/Logo';
import { useTranslations } from '@/hooks';

const Content = () => {
  const t = useTranslations();

  return (
    <Visibility>
      {(props) => (
        <S.Wrapper
          {...props}
          ref={props.ref as React.RefObject<HTMLDivElement>}
        >
          <Logo big />
          <S.Title>{t('Home.auth.content.title')}</S.Title>
          <S.Text>{t('Home.auth.content.text')}</S.Text>
          <S.List>
            {t.raw('Home.auth.content.list').map((item, index) => (
              <S.Item key={index}>
                <S.Checked>
                  <Icon as={CheckedIcon} />
                </S.Checked>
                {item}
              </S.Item>
            ))}
          </S.List>
        </S.Wrapper>
      )}
    </Visibility>
  );
};

export default Content;
