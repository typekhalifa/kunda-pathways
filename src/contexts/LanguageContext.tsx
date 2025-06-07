
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { translations } from "../translations";
import { LanguageContextType } from "../types/translations";

const LanguageContext = createContext<LanguageContextType>({
  language: "EN",
  setLanguage: () => {},
  translations: translations.EN,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("EN");

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang: string) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem("language", lang);
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, translations: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
