import { useParams } from 'next/navigation';
import en from '@/locales/en';
import uk from '@/locales/uk';
import by from '@/locales/by';
import ru from '@/locales/ru';

const translations = { en, uk, by, ru };
type Locale = keyof typeof translations;

export function useTranslation() {
  const params = useParams();
  const locale = (params?.locale as Locale) ?? 'en';

  const translate = translations[locale] || translations.en;

  return { translate, locale };
}
