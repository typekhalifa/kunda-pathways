
import { enTranslations } from './en';
import { koTranslations } from './ko';
import { frTranslations } from './fr';
import { Translations } from '../types/translations';

export const translations: { [key: string]: Translations } = {
  EN: enTranslations,
  KO: koTranslations,
  FR: frTranslations,
};
