'use client';

import styles from '@/app/(styles)/staff-list.module.css';
import { useTranslation } from '@/app/(hooks)/use-translation';

export default function StaffList() {
  const { translate } = useTranslation();
  const t = translate.home.staff;

  return (
    <div className={styles.staffContainer}>
      <div className={styles.staffOnline}>{t.title}</div>
      <div className={`${styles.staffColumn} ${styles.admins}`}>
        <div className={styles.staffHeader}>{t.admins}</div>
        <div className={styles.staffUsers}>
          <div className={styles.userOnline}>👤🟢</div>
        </div>
      </div>

      <div className={`${styles.staffColumn} ${styles.loremasters}`}>
        <div className={styles.staffHeader}>{t.lore}</div>
        <div className={styles.staffUsers}>
          <div className={styles.userOnline}>👤🟢</div>
          <div className={styles.userOnline}>👤🟢</div>
        </div>
      </div>

      <div className={`${styles.staffColumn} ${styles.techadmins}`}>
        <div className={styles.staffHeader}>{t.tech}</div>
        <div className={styles.staffUsers}>
          <div className={styles.userOnline}>👤🟢</div>
        </div>
      </div>
    </div>
  );
}
