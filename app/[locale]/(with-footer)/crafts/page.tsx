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
      <p className={styles.hint}>
        Кастомные крафты делаются на алтаре на сервере, который выставлен особыми блоками так же как
        и на сайте. Чтобы что-то скрафтить, нужно выложить предметы в рамки на эти блоки в точности
        как на сайте, добавив в блок по центру незер-звезду — она есть в каждом крафте.
      </p>
    </main>
  );
}
