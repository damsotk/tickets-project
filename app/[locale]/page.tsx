import type { Metadata } from 'next';
import styles from '@/app/(styles)/main-page.module.css';
import Header from '@/app/(components)/main-page/Header';
import HeroSection from '../(components)/main-page/HeroSection';
import OnlineStats from '../(components)/main-page/OnlineStats';

export const metadata: Metadata = {
  title: 'Ellium',
  description: 'Ellium Minecraft Server',
};

export default function ElliumMain() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <HeroSection />
        <OnlineStats />
      </main>
    </div>
  );
}
