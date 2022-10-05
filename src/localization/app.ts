import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translationsGB } from './gb';
import { translationsPL } from './pl';

const resources = {
  en: {
    translation: translationsGB
  },
  pl: {
    translation: translationsPL
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
