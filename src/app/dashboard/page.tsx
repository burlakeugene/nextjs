'use client';
import React from 'react';

import { useTranslations } from '@/hooks';
import Page from '@/components/Page';

import Tabs from '@/components/Tabs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import List from '@/containers/Website/List';

const DATA_PARAM_KEY = 'data';

const data = [
  {
    name: 'articles',
  },
  {
    name: 'indexation',
  },
];

const Dashboard = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const active = React.useMemo(() => {
    return (
      data[
        data.findIndex((item) => item.name === searchParams.get(DATA_PARAM_KEY))
      ] || data[0]
    );
  }, [searchParams]);

  return (
    <Page
      header={{
        title: t(`Dashboard.name`),
      }}
    >
      <Tabs
        active={data.findIndex((item) => item.name === active.name)}
        onChange={(nextIndex) => {
          const nextSearchParams = new URLSearchParams(searchParams.toString());
          nextSearchParams.set(
            DATA_PARAM_KEY,
            data.find((data, index) => index === nextIndex)?.name ||
              data[0].name
          );

          const nextSearchParamsString = nextSearchParams.toString();

          let nextPath = pathname;
          if (nextSearchParamsString) {
            nextPath += `?${nextSearchParamsString}`;
          }

          router.replace(nextPath);
        }}
        list={[
          {
            label: t('common.articles'),
            content: <List type={active.name} />,
          },
          {
            label: t('common.indexation'),
            content: <div>2</div>,
          },
        ]}
      />
    </Page>
  );
};

export default Dashboard;
