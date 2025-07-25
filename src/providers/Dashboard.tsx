'use client';

import { modal } from '@/components/Modal';
import { useAppSelector } from '@/store/hooks';
import React from 'react';
import Welcome from '@/containers/Welcome';

const Dashboard = React.memo<React.PropsWithChildren>(({ children }) => {
  const auth = useAppSelector((state) => ({
    ...state.auth,
    data: state.auth.data || {},
  }));

  const needWelcome = auth.data?.isFilled === false;

  React.useEffect(() => {
    if (needWelcome) {
      modal.open({
        content: (closeModal) => <Welcome onSubmit={closeModal} />,
        options: {
          close: {
            disabled: true,
          },
        },
      });
    }
  }, [needWelcome]);

  return children;
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
