'use client';
import styles from '@/app/(styles)/auth-styles/auth-styles.module.css';

export default function TicketsPage() {
  const handleTestGetClick = async () => {
    try {
      const response = await fetch('/api/tickets/get-tickets', {
        method: 'GET',
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Tickets:', data.tickets);
      } else {
        console.error('Error fetching tickets:', data.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return <button onClick={() => handleTestGetClick()}>test button for get tickets</button>;
}
