import { addZero } from './addZero';
import { useTranslation } from 'react-i18next';

export const getCurrentDate = (time: string) => {
  const { t } = useTranslation();

  const today = new Date(Number(time));
  const date = `${t('Date')}: ${addZero(today.getDate())}-${addZero(
    today.getMonth() + 1
  )}; ${t('Time')}: ${addZero(today.getHours())}:${addZero(
    today.getMinutes()
  )}`;
  return date;
};
