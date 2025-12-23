import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zhHans from '../i18n/zh-Hans.json';
import zhHant from '../i18n/zh-Hant.json';
import en from '../i18n/en.json';
import ja from '../i18n/ja.json';
import { LANG } from '../constant';

i18n.use(initReactI18next).init({
  resources: {
    [LANG.ZH_HANS]: {
      translation: zhHans,
    },
    [LANG.ZH_HANT]: {
      translation: zhHant,
    },
    [LANG.EN]: {
      translation: en,
    },
    [LANG.JA]: {
      translation: ja,
    },
  },
  lng: LANG.ZH_HANS,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
