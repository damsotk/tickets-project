import { getAllTicketsForAdmin, getTicketsCurrentUser } from '@/utils/api-server/tickets-server';
import TicketsPageClient from '@/app/(components)/tickets-page/TicketsPageClient';

export default async function TicketsPage() {
  const [tickets, adminTickets] = await Promise.all([
    getTicketsCurrentUser(),
    getAllTicketsForAdmin(),
  ]);
  console.log(adminTickets);

  return <TicketsPageClient initialTickets={tickets} />;
}
