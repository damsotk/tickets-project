import styles from '@/app/(styles)/main-page.module.css';
import HeroSection from '../../(components)/main-page/HeroSection';
import OnlineStats from '../../(components)/main-page/OnlineStats';
import NavigationGrid from '../../(components)/main-page/navigation-grid/NavigationGrid';

export default function ElliumMain() {
  return (
    <div className={styles.app}>
      <HeroSection />
      <main className={styles.main}>
        <NavigationGrid />
        <OnlineStats />
      </main>
    </div>
  );
}
