
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { translations } from "../translations";
import { LanguageContextType } from "../types/translations";

const LanguageContext = createContext<LanguageContextType>({
  language: "EN",
  setLanguage: () => {},
  translations: translations.EN,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>("EN");

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
    }
    
    // Listen for language changes from other components
    const handleLanguageChange = (event: CustomEvent) => {
      const newLang = event.detail;
      if (translations[newLang]) {
        setLanguage(newLang);
      }
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  const changeLanguage = (lang: string) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem("language", lang);
      // Force a re-render by dispatching the event
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: changeLanguage, 
      translations: translations[language] || translations.EN 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
