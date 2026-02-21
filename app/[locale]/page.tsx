import type { Metadata } from 'next';
import styles from '@/app/(styles)/main-page.module.css';
import TicketsTypes from '@/app/(components)/main-page/TicketsTypes';
import StaffList from '@/app/(components)/main-page/StaffList';
import Header from '@/app/(components)/main-page/Header';

export const metadata: Metadata = {
  title: 'Ellium Tickets',
  description: 'Application for create tickets',
};

export default async function ElliumTickets() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <TicketsTypes />
        <StaffList />
      </main>
    </div>
  );
}
