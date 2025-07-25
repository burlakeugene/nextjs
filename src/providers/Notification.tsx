'use client';

import React from 'react';
import Notic from 'notic';

const Notification = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    const notifications = new Notic({
      close: {
        button: true,
        area: true,
      },
      animation: {
        time: 300,
      },
    });

    window.notifications = notifications;

    return () => {
      window.notifications?.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default Notification;
