
export interface Translations {
  [key: string]: string;
}

export interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translations: Translations;
}
