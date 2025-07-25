'use client';

import { ThemeProvider } from 'styled-components';
import theme from './theme';

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Provider;
