'use client';
import { useLocale } from 'next-intl';
import { ChangeEvent } from 'react';
import { setLocale } from '@/i18n/actions';

export default function LocaleSwitcher() {
  const locale = useLocale();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value);
  };

  return (
    <select
      onChange={handleChange}
      value={locale}
      className="bg-transparent border-none cursor-pointer"
    >
      <option value="ru">Русский</option>
      <option value="en">English</option>
    </select>
  );
}
