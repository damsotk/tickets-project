import { getTicketsCurrentUser } from '@/utils/api-server/tickets-server';
import { getCurrentUser } from '@/utils/api-server/auth-server';
import TicketsPageClient from '@/app/(components)/tickets-page/TicketsPageClient';
import { redirect } from 'next/navigation';

export default async function TicketsPage() {
  const [tickets, currentUser] = await Promise.all([getTicketsCurrentUser(), getCurrentUser()]);
  if (!currentUser) {
    redirect('/auth');
  }

  return <TicketsPageClient initialTickets={tickets} currentUser={currentUser} />;
}
