import { getTicketsCurrentUser } from '@/utils/api-server/tickets-server';
import TicketsPageClient from '@/app/(components)/tickets-page/TicketsPageClient';

export default async function TicketsPage() {
  const [tickets] = await Promise.all([getTicketsCurrentUser()]);

  return <TicketsPageClient initialTickets={tickets} />;
}
