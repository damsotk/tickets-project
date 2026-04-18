import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getCurrentUser } from '@/utils/api-server/auth-server';
import { UserProvider } from '@/contexts/UserContext';
import { Toaster } from 'sonner';
import CookieConsentBanner from '../(components)/CookieConsentBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://elium.site'),
  title: {
    default: 'Library of Knowledge',
    template: '%s | Library of Knowledge',
  },
  description: 'Explore the vast world of lore, characters, cities, and faith.',
  openGraph: {
    type: 'website',
    siteName: 'Library of Knowledge',
    locale: 'en_US',
    images: [
      {
        url: '/ellium-tickets-images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Library of Knowledge',
      },
    ],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const user = await getCurrentUser();
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <UserProvider initialUser={user}>{children}</UserProvider>
        <Toaster theme="dark" richColors position="top-right" />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
