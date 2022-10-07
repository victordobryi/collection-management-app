import { addZero } from './addZero';

export const getCurrentDate = (time: string) => {
  const today = new Date(Number(time));
  const date = `Date: ${addZero(today.getDate())}-${addZero(
    today.getMonth() + 1
  )}; Time: ${addZero(today.getHours())}:${addZero(today.getMinutes())}`;
  return date;
};
