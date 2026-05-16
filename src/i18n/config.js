import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import arRes from './locales/ar.json';
import enRes from './locales/en.json';

// لازم يكون i18n والنقطة اللي بعدها ملزوقين ببعض أو في نفس الكتلة
i18n
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enRes },
      ar: { translation: arRes }
    },
    fallbackLng: 'en', // صلحنا الكلمة هون كمان
    interpolation: { escapeValue: false }
  });

export default i18n;