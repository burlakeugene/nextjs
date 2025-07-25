'use client';

import Page from '@/components/Page';
import { useTranslations } from '@/hooks';

const User = () => {
  const t = useTranslations();

  return (
    <Page
      header={{
        title: t('User.title'),
      }}
    ></Page>
  );
};

export default User;
