import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { getCurrentUser } from '@/utils/api-server/auth-server';
import { UserProvider } from '@/contexts/UserContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ellium Tickets',
  description: 'Support ticket system',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider initialUser={user}>{children}</UserProvider>
      </body>
    </html>
  );
}
