import styles from '@/app/(styles)/staff-list.module.css';

export default function StaffList() {
  return (
    <div className={styles.staffContainer}>
      <div className={styles.staffOnline}>Staff online:</div>
      <div className={`${styles.staffColumn} ${styles.admins}`}>
        <div className={styles.staffHeader}>Admins</div>
        <div className={styles.staffUsers}>
          <div className={styles.userOnline}>👤🟢</div>
        </div>
      </div>

      <div className={`${styles.staffColumn} ${styles.loremasters}`}>
        <div className={styles.staffHeader}>Lore</div>
        <div className={styles.staffUsers}>
          <div className={styles.userOnline}>👤🟢</div>
          <div className={styles.userOnline}>👤🟢</div>
        </div>
      </div>

      <div className={`${styles.staffColumn} ${styles.techadmins}`}>
        <div className={styles.staffHeader}>Tech</div>
        <div className={styles.staffUsers}>
          <div className={styles.userOnline}>👤🟢</div>
        </div>
      </div>
    </div>
  );
}
