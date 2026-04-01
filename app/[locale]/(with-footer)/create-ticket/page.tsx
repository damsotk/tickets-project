import type { Metadata } from 'next';
import styles from '@/app/(styles)/create-ticket-styles/main-page.module.css';
import TicketsTypes from '@/app/(components)/create-ticket-page/TicketsTypes';
import StaffList from '@/app/(components)/create-ticket-page/StaffList';

export const metadata: Metadata = {
  title: 'Ellium Tickets',
  description: 'Application for create tickets',
};

export default async function CreateTicketPage() {
  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <TicketsTypes />
        <StaffList />
      </main>
    </div>
  );
}
