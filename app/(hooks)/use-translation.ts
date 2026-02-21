import en from '@/locales/en';
import uk from '@/locales/uk';
import { useRouter } from 'next/router';

const translations = { en, uk };
export function useTranslation() {
  const router = useRouter();
  const { locale } = router;

  const currentLocale = (locale ?? 'en') as keyof typeof translations;
  const translate = translations[currentLocale];

  return { translate, locale: currentLocale };
}
