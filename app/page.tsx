import type { Metadata } from 'next';
import styles from '@/app/(styles)/main-page.module.css';
import TicketsTypes from '@/app/(components)/main-page/TicketsTypes';
import StaffList from '@/app/(components)/main-page/StaffList';
import { getCurrentUser } from '@/lib/auth-server';
import Header from './(components)/main-page/Header';

export const metadata: Metadata = {
  title: 'Ellium Tickets',
  description: 'Application for create tickets',
};

export default async function ElliumTickets() {
  const user = await getCurrentUser();
  return (
    <div className={styles.app}>
      <Header user={user} />
      <main className={styles.main}>
        <TicketsTypes user={user} />
        <StaffList />
      </main>
    </div>
  );
}
