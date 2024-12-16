import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './en.json';
import hiTranslation from './hi.json';
import guTranslation from './gu.json';
import maTranslation from './ma.json';

const resources = {
  en: { translation: enTranslation },
  hi: { translation: hiTranslation },
  gu: { translation: guTranslation },
  ma: { translation: maTranslation },
};

const storedLanguage = localStorage.getItem('language') || 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: storedLanguage,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
