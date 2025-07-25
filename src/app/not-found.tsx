'use client';

import styled from 'styled-components';
import PageBase from '@/components/Page';
import * as PageStyles from '@/components/Page/style';
import { useTranslations } from '@/hooks';
import Empty from '@/components/Empty';
import { useRouter } from 'next/navigation';

const Page = styled(PageBase)`
  flex: 1;
  display: flex;
  flex-direction: column;
  ${PageStyles.Wrapper} {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  ${PageStyles.Content} {
    flex: 1;
  }
`;

const NotFound = () => {
  const t = useTranslations();
  const router = useRouter();

  return (
    <Page>
      <Empty
        title={t('NotFound.title')}
        subtitle={t('NotFound.subtitle')}
        text={t('NotFound.text')}
        button={{
          text: t('NotFound.button'),
          onClick: () => {
            router.push('/');
          },
        }}
      />
    </Page>
  );
};

export default NotFound;
