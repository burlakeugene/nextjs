'use client';

import { key } from './constant';

export const setLocale = (value: string) => {
  document.cookie = `${key}=${value}; path=/; max-age=31536000`;
  window.location.reload();
};
