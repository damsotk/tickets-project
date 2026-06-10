import { RECIPES } from '@/constants/server_recipes';
import { CraftsViewer } from '@/app/(components)/crafts-page/CraftsViewer';
import styles from '@/app/(styles)/crafts-styles/crafts-page.module.css';

export const metadata = {
  title: 'Кастомные крафты',
};

export default function CraftsPage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.pageTitle}>Кастомные крафты</h1>
      <CraftsViewer recipes={RECIPES} />
    </main>
  );
}
