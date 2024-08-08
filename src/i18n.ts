import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// TODO: translation files
const resources = {
  en: {
    translation: {
      "Current Language": "English",
    },
  },
  de: {
    translation: {
      "Current Language": "Deutsch",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
