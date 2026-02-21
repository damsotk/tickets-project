import { useParams } from 'next/navigation';
import en from '@/locales/en';
import uk from '@/locales/uk';

const translations = { en, uk };
type Locale = keyof typeof translations;

export function useTranslation() {
  const params = useParams();
  const locale = (params?.locale as Locale) ?? 'en';

  const translate = translations[locale] || translations.en;

  return { translate, locale };
}
