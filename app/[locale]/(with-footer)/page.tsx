import type { Metadata } from 'next';
import styles from '@/app/(styles)/main-page.module.css';
import HeroSection from '../../(components)/main-page/HeroSection';
import OnlineStats from '../../(components)/main-page/OnlineStats';
import NavigationGrid from '../../(components)/main-page/NavigationGrid';
import WhiteList from '@/app/(components)/main-page/WhiteList';

export const metadata: Metadata = {
  title: 'Ellium',
  description: 'Ellium Minecraft Server',
};

export default function ElliumMain() {
  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <HeroSection />
        <WhiteList />
        <NavigationGrid />
        <OnlineStats />
      </main>
    </div>
  );
}
