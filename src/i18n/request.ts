import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { key, list, fallback } from './constant';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localCookie = cookieStore.get(key)?.value;

  const locale =
    localCookie && list.includes(localCookie) ? localCookie : fallback;

  return {
    locale,
    messages: (await import(`./translations/${locale}.ts`)).default,
  };
});
