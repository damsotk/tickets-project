'use client';

import Image from 'next/image';
import UserAvatar from '@/app/(components)/profile-page/UserAvatar';
import { useTransferHistory } from '@/app/(hooks)/profile-page-hooks/use-transfer-history';
import { useTranslation } from '@/app/(hooks)/use-translation';
import { formatDate } from '@/utils/format-date';
import { formatShortId } from '@/utils/format-short-id';
import type { TransferDirection } from '@/types/transfer';
import styles from '@/app/(styles)/profile-styles/transfer-history.module.css';

const DIRECTIONS: TransferDirection[] = ['all', 'sent', 'received'];

interface TransferHistoryProps {
  refreshKey: number;
}

export default function TransferHistory({ refreshKey }: TransferHistoryProps) {
  const { translate } = useTranslation();
  const t = translate.profile.transferHistory;

  const { direction, transfers, hasMore, isLoading, isLoadingMore, setDirection, loadMore } =
    useTransferHistory(refreshKey);

  return (
    <div className={styles.historySection}>
      <div className={styles.historyHeader}>
        <h2 className={styles.historyTitle}>{t.title}</h2>

        <div className={styles.tabs} role="tablist">
          {DIRECTIONS.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={direction === item}
              className={`${styles.tab} ${direction === item ? styles.tabActive : ''}`}
              onClick={() => setDirection(item)}
              disabled={isLoadingMore}
            >
              {t.tabs[item]}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <p className={styles.hint}>{t.loading}</p>
      ) : transfers.length === 0 ? (
        <p className={styles.hint}>{t.empty}</p>
      ) : (
        <ul className={styles.list}>
          {transfers.map((transfer) => {
            const isSent = transfer.direction === 'sent';
            const { counterparty } = transfer;

            return (
              <li key={transfer.id} className={styles.item}>
                <UserAvatar
                  name={counterparty?.name ?? '?'}
                  avatar={counterparty?.avatar ?? null}
                  size={36}
                />

                <div className={styles.itemInfo}>
                  <div className={styles.itemUser}>
                    <span className={styles.itemName}>{counterparty?.name ?? t.deletedUser}</span>
                    {counterparty && (
                      <span className={styles.itemId}>{formatShortId(counterparty.id)}</span>
                    )}
                  </div>
                  <span className={styles.itemMeta}>
                    {isSent ? t.sent : t.received} · {formatDate(transfer.createdAt)}
                  </span>
                </div>

                <span
                  className={`${styles.itemAmount} ${isSent ? styles.amountSent : styles.amountReceived}`}
                >
                  {isSent ? '−' : '+'}
                  {transfer.amount.toLocaleString('en-US')}
                  <Image src="/icons/custom_gold_ingot.png" alt="" width={16} height={16} />
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {!isLoading && hasMore && (
        <button
          type="button"
          className={styles.loadMore}
          onClick={loadMore}
          disabled={isLoadingMore}
        >
          {isLoadingMore ? t.loading : t.loadMore}
        </button>
      )}
    </div>
  );
}
