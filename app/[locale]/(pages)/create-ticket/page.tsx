import type { Metadata } from 'next';
import styles from '@/app/(styles)/main-page.module.css';
import TicketsTypes from '@/app/(components)/create-ticket-page/TicketsTypes';
import StaffList from '@/app/(components)/create-ticket-page/StaffList';
import Header from '@/app/(components)/main-page/Header';

export const metadata: Metadata = {
  title: 'Ellium Tickets',
  description: 'Application for create tickets',
};

export default async function CreateTicketPage() {
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
