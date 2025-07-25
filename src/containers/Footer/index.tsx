'use client';

import React from 'react';
import * as S from './style';
import Container from '@/components/Container';
import Logo from '@/components/Logo';
import { useTranslations } from '@/hooks';
import Socials from '@/containers/Socials';
import Icon from '@/components/Icon';
import MailIcon from '@/assets/icons/mail.svg';
import PhoneIcon from '@/assets/icons/phone.svg';
import LocationIcon from '@/assets/icons/location.svg';

const Footer = React.memo(() => {
  const t = useTranslations();

  return (
    <S.Wrapper>
      <Container>
        <S.Rows>
          <S.Row>
            <S.Col>
              <Logo withLabel />
              {t('Footer.text')}
              <Socials />
            </S.Col>
            <S.Col>
              <S.Title>{t('Footer.product')}</S.Title>
              <S.Items>
                <S.Link href="/opportunities">
                  {t('Footer.opportunities')}
                </S.Link>
                <S.Link href="/tariffs">{t('Footer.tariffs')}</S.Link>
                <S.Link href="/api">{t('Footer.api')}</S.Link>
                <S.Link href="/integrations">{t('Footer.integrations')}</S.Link>
                <S.Link href="/updates">{t('Footer.updates')}</S.Link>
              </S.Items>
            </S.Col>
            <S.Col>
              <S.Title>{t('Footer.support')}</S.Title>
              <S.Items>
                <S.Link href="/help-center">{t('Footer.helpCenter')}</S.Link>
                <S.Link href="/guide">{t('Footer.guide')}</S.Link>
                <S.Link href="/tech-support">{t('Footer.techSupport')}</S.Link>
                <S.Link href="/status-system">
                  {t('Footer.statusSystem')}
                </S.Link>
              </S.Items>
            </S.Col>
            <S.Col>
              <S.Title>{t('Footer.company')}</S.Title>
              <S.Items>
                <S.Link href="/about">{t('Footer.aboutUs')}</S.Link>
                <S.Link href="/blog">{t('Footer.blog')}</S.Link>
                <S.Link href="/partners">{t('Footer.partners')}</S.Link>
              </S.Items>
            </S.Col>
            <S.Col>
              <S.Title>{t('Footer.contacts')}</S.Title>
              <S.Items>
                <S.Link href="mailto:support@seobotai.ru" target="_blank">
                  <Icon as={MailIcon} />
                  support@seobotai.ru
                </S.Link>
                <S.Link href="tel:+7 (495) 123-45-67" target="_blank">
                  <Icon as={PhoneIcon} />
                  +7 (495) 123-45-67
                </S.Link>
                <S.Item>
                  <Icon as={LocationIcon} />
                  {t('common.dislocation')}
                </S.Item>
              </S.Items>
            </S.Col>
          </S.Row>
          <S.Deliver />
          <S.Bottom>
            <S.Rights>
              {t('common.rights', { year: new Date().getFullYear() })}
            </S.Rights>
            <S.Items>
              <S.Link href="/policy">{t('Footer.policy')}</S.Link>
              <S.Link href="/term-of-use">{t('Footer.termOfUse')}</S.Link>
              <S.Link href="/user-agreement">
                {t('Footer.userAgreement')}
              </S.Link>
            </S.Items>
          </S.Bottom>
        </S.Rows>
      </Container>
    </S.Wrapper>
  );
});

Footer.displayName = 'Footer';

export default Footer;
