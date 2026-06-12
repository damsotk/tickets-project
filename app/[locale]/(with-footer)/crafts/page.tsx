import { RECIPES } from '@/constants/server_recipes';
import { CraftsViewer } from '@/app/(components)/crafts-page/CraftsViewer';
import styles from '@/app/(styles)/crafts-styles/crafts-page.module.css';

export const metadata = {
  title: 'Кастомные крафты',
};

export default function CraftsPage() {
  return (
    <main className={styles.page}>
      <CraftsViewer recipes={RECIPES} />
      <p className={styles.hint}>
        Кастомные крафты делаются на алтаре на сервере, который выставлен магнетитом так же как и на
        сайте. Чтобы что-то скрафтить, нужно выложить предметы в рамки на магнетит в точности как на
        сайте, добавив в блок по центру незер-звезду — она есть в каждом крафте.
      </p>
    </main>
  );
}
