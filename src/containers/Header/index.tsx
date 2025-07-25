'use client';

import Logo from '@/components/Logo';
import React from 'react';
import * as S from './style';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getProfile, logoutSilence } from '@/store/slices/auth';
import { usePathname, useRouter } from 'next/navigation';
import { useScroll, useTranslations } from '@/hooks';
import Button from '@/components/Button';
import { setLoading } from '@/store/slices/ui';
import Emitter, { EEvents } from '@/utils/Emitter';
import { wait } from '@/utils';
import User from './components/User';
import Container from '@/components/Container';

const Header = React.memo(() => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const t = useTranslations();

  const pathname = usePathname();

  const router = useRouter();

  const scroll = useScroll();

  React.useEffect(() => {
    const onLogout = () => {
      dispatch(logoutSilence());
    };

    Emitter.on(EEvents.LOGOUT, onLogout);

    return () => {
      Emitter.off(EEvents.LOGOUT, onLogout);
    };
  }, []);

  React.useEffect(() => {
    const loadingOff = async () => {
      await wait();

      dispatch(setLoading(false));
    };

    if (!auth.token) {
      router.push('/');
      loadingOff();

      return;
    }

    dispatch(getProfile()).finally(() => {
      loadingOff();
    });
  }, [auth.token, dispatch, router]);

  const hide = React.useMemo(() => {
    if (pathname === '/') {
      return !auth.data && scroll.pixels <= scroll.clientHeight;
    }

    return false;
  }, [pathname, scroll, auth]);

  return (
    <S.Wrapper hide={hide}>
      <Container>
        <S.Panel>
          <Logo withLabel />
          <S.PanelEnd>
            {!auth.data ? (
              <Button
                onClick={() => {
                  router.replace('/#auth');
                }}
              >
                {t('common.login')}
              </Button>
            ) : (
              <User />
            )}
          </S.PanelEnd>
        </S.Panel>
      </Container>
    </S.Wrapper>
  );
});

Header.displayName = 'Header';

export default Header;
