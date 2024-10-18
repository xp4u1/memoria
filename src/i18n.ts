import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import de from "../locales/de/translation.json";
import en from "../locales/en/translation.json";
import it from "../locales/it/translation.json";
import tr from "../locales/tr/translation.json";

const resources = {
  de: {
    translation: de,
  },
  en: {
    translation: en,
  },
  it: {
    translation: it,
  },
  tr: {
    translation: tr,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: navigator.language.split("-")[0],
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
