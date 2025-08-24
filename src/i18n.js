import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enAboutPage from './locales/en/aboutPage.json';
import enChatbot from './locales/en/chatbot.json';
import enCommon from './locales/en/common.json';
import enContact from './locales/en/contact.json';
import enFaq from './locales/en/faq.json';
import enFooter from './locales/en/footer.json';
import enGuides from './locales/en/guides.json';
import enHome from './locales/en/home.json';
import enNavbar from './locales/en/navbar.json';
import enPetDetails from './locales/en/petDetails.json';
import enPetTraining from './locales/en/petTraining.json';
import enPets from './locales/en/pets.json';
import enProfile from './locales/en/profile.json';
// Import namespaces

import enSavedPets from './locales/en/savedPets.json';
import enSelectOptions from './locales/en/selectOptions.json';
import enSupport from './locales/en/support.json';
import enUserPets from './locales/en/userPets.json';
import enUserPosters from './locales/en/userPosters.json';
import enUserSettings from './locales/en/userSettings.json';
import lvAboutPage from './locales/lv/aboutPage.json';
import lvChatbot from './locales/lv/chatbot.json';
import lvCommon from './locales/lv/common.json';
import lvContact from './locales/lv/contact.json';
import lvFaq from './locales/lv/faq.json';
import lvFooter from './locales/lv/footer.json';
import lvGuides from './locales/lv/guides.json';
import lvHome from './locales/lv/home.json';
import lvNavbar from './locales/lv/navbar.json';
import lvPetDetails from './locales/lv/petDetails.json';
import lvPetTraining from './locales/lv/petTraining.json';
import lvPets from './locales/lv/pets.json';
import lvProfile from './locales/lv/profile.json';
import lvSavedPets from './locales/lv/savedPets.json';
import lvSelectOptions from './locales/lv/selectOptions.json';
import lvSupport from './locales/lv/support.json';
import lvUserPets from './locales/lv/userPets.json';
import lvUserPosters from './locales/lv/userPosters.json';
import lvUserSettings from './locales/lv/userSettings.json';
import ruAboutPage from './locales/ru/aboutPage.json';
import ruChatbot from './locales/ru/chatbot.json';
import ruCommon from './locales/ru/common.json';
import ruContact from './locales/ru/contact.json';
import ruFaq from './locales/ru/faq.json';
import ruFooter from './locales/ru/footer.json';
import ruGuides from './locales/ru/guides.json';
import ruHome from './locales/ru/home.json';
import ruNavbar from './locales/ru/navbar.json';
import ruPetDetails from './locales/ru/petDetails.json';
import ruPetTraining from './locales/ru/petTraining.json';
import ruPets from './locales/ru/pets.json';
import ruProfile from './locales/ru/profile.json';
import ruSavedPets from './locales/ru/savedPets.json';
import ruSelectOptions from './locales/ru/selectOptions.json';
import ruSupport from './locales/ru/support.json';
import ruUserPets from './locales/ru/userPets.json';
import ruUserPosters from './locales/ru/userPosters.json';
import ruUserSettings from './locales/ru/userSettings.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        common: enCommon,
        navbar: enNavbar,
        footer: enFooter,
        aboutPage: enAboutPage,

        home: enHome,
        selectOptions: enSelectOptions,
        chatbot: enChatbot,
        contact: enContact,
        support: enSupport,
        faq: enFaq,
        guides: enGuides,
        pets: enPets,
        petTraining: enPetTraining,
        petDetails: enPetDetails,
        profile: enProfile,
        savedPets: enSavedPets,
        userPets: enUserPets,
        userSettings: enUserSettings,
        userPosters: enUserPosters,
      },
      lv: {
        common: lvCommon,
        navbar: lvNavbar,
        footer: lvFooter,
        aboutPage: lvAboutPage,

        home: lvHome,
        selectOptions: lvSelectOptions,
        chatbot: lvChatbot,
        contact: lvContact,
        support: lvSupport,
        faq: lvFaq,
        guides: lvGuides,
        pets: lvPets,
        petTraining: lvPetTraining,
        petDetails: lvPetDetails,
        profile: lvProfile,
        savedPets: lvSavedPets,
        userPets: lvUserPets,
        userSettings: lvUserSettings,
        userPosters: lvUserPosters,
      },
      ru: {
        common: ruCommon,
        navbar: ruNavbar,
        footer: ruFooter,
        home: ruHome,
        aboutPage: ruAboutPage,

        selectOptions: ruSelectOptions,
        chatbot: ruChatbot,
        contact: ruContact,
        support: ruSupport,
        faq: ruFaq,
        guides: ruGuides,
        pets: ruPets,
        petTraining: ruPetTraining,
        petDetails: ruPetDetails,
        profile: ruProfile,
        savedPets: ruSavedPets,
        userPets: ruUserPets,
        userSettings: ruUserSettings,
        userPosters: ruUserPosters,
      },
    },
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
    ns: [
      'common',
      'navbar',
      'footer',
      'aboutPage',
      'home',
      'selectOptions',
      'chatbot',
      'contact',
      'support',
      'faq',
      'guides',
      'pets',
      'petTraining',
      'petDetails',
      'profile',
      'savedPets',
      'userPets',
      'userSettings',
      'userPosters',
    ],
    defaultNS: 'common', // Default namespace
  });

export default i18n;
