'use client';
import { RECIPES } from '@/constants/server_recipes';
import { CraftsViewer } from '@/app/(components)/crafts-page/CraftsViewer';
import styles from '@/app/(styles)/crafts-styles/crafts-page.module.css';
import { useTranslation } from '@/app/(hooks)/use-translation';

export default function CraftsPage() {
  const { translate } = useTranslation();

  const t = translate.crafts.altarInstruction;
  return (
    <main className={styles.page}>
      <CraftsViewer recipes={RECIPES} />
      <p className={styles.hint}>{t}</p>
    </main>
  );
}
