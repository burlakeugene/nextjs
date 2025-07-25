'use client';
import React from 'react';
import { Provider } from 'react-redux';
import store from './';

const StoreProvider = (props: React.PropsWithChildren) => {
  return <Provider store={store}>{props.children}</Provider>;
};

export default StoreProvider;
