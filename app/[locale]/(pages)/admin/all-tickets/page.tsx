import AdminTicketsClient from '@/app/(components)/admin-pages/AdminTickets';
import { getAllTicketsForAdmin } from '@/utils/api-server/tickets-server';

export default async function AdminTicketsServer() {
  const [allTickets] = await Promise.all([getAllTicketsForAdmin()]);

  return <AdminTicketsClient allTickets={allTickets} />;
}
