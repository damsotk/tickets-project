import type { Metadata } from "next";
import styles from "@/app/(styles)/ellium-tickets-styles/main-page.module.css";
import Header from "@/app/(components)/ellium-tickets/main-page/Header";
import TicketsTypes from "@/app/(components)/ellium-tickets/main-page/TicketsTypes";
import StaffList from "@/app/(components)/ellium-tickets/main-page/StaffList";

export const metadata: Metadata = {
  title: "Ellium Tickets",
  description: "Application for create tickets",
};

export default function ElliumTickets() {
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
