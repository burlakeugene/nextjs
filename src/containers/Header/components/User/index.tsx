import React from 'react';
import Avatar from '@/components/Avatar';
import Dropdown from '@/components/Dropdown';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import * as S from './style';
import { usePathname } from 'next/navigation';
import { logoutSilence } from '@/store/slices/auth';
import { setLoading } from '@/store/slices/ui';
import { wait } from '@/utils';
import { useTranslations } from '@/hooks';
import Icon from '@/components/Icon';
import DashboardIcon from '@/assets/icons/dashboard.svg';
import UserIcon from '@/assets/icons/user.svg';
import LogoutIcon from '@/assets/icons/logout.svg';

const User = React.memo(() => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const t = useTranslations();
  const auth = useAppSelector((state) => state.auth);

  const name = React.useMemo(() => {
    let result = '';

    if (auth.data?.firstName) {
      result = auth.data.firstName;
    }

    if (auth.data?.lastName) {
      if (result) {
        result += ' ';
      }

      result += auth.data.lastName;
    }

    return result;
  }, [auth.data?.firstName, auth.data?.lastName]);

  return (
    <Dropdown
      toggle={() => <Avatar name={name} />}
      overlay={({ setOpened }) => (
        <S.Overlay>
          <S.Top>
            {name && <S.Name>{name}</S.Name>}
            <S.Tariff>
              {t('User.tariff.value', {
                value: t('User.tariff.list.premium'),
              })}
            </S.Tariff>
          </S.Top>
          <S.Links>
            <S.Link
              href="/user"
              active={pathname === '/user'}
              onClick={() => {
                setOpened(false);
              }}
            >
              <Icon as={UserIcon} />
              {t('User.title')}
            </S.Link>
            <S.Link
              href="/dashboard"
              active={pathname === '/dashboard'}
              onClick={() => {
                setOpened(false);
              }}
            >
              <Icon as={DashboardIcon} />
              {t('Dashboard.name')}
            </S.Link>
          </S.Links>
          <S.Links>
            <S.Link
              red
              href="/"
              onClick={async () => {
                setOpened(false);

                if (pathname !== '/') {
                  dispatch(setLoading(true));
                  await wait();
                }

                dispatch(logoutSilence());
              }}
            >
              <Icon as={LogoutIcon} />
              {t('common.logout')}
            </S.Link>
          </S.Links>
        </S.Overlay>
      )}
    />
  );
});

User.displayName = 'User';

export default User;
