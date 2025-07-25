import { format } from 'date-fns';

export const getDate = (date: Date | string) => {
  if (typeof date === 'string') {
    return new Date(date);
  }

  return date;
};

export const formatted = ({
  date = new Date(),
  format: dateFromat = 'd.MM.yyyy HH:mm',
}: {
  date?: Date | string;
  format?: string;
} = {}) => {
  date = getDate(date);

  return format(date, dateFromat);
};
