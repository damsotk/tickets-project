// app/[locale]/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getCurrentUser } from '@/utils/api-server/auth-server';
import { UserProvider } from '@/contexts/UserContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ellium Tickets',
  description: 'Support ticket system',
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
      </body>
    </html>
  );
}
