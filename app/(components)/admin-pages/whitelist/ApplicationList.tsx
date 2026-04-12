import { Application } from '@/types/whitelist';
import { ApplicationCard } from './ApplicationCard';
import styles from '@/app/(styles)/admin-styles/whitelist-page.module.css';

interface Props {
  applications: Application[];
  fetching: boolean;
  expandedId: string | null;
  processingId: string | null;
  rejectComments: Record<string, string>;
  onToggleExpand: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onRejectCommentChange: (id: string, value: string) => void;
}

export function ApplicationList({
  applications,
  fetching,
  expandedId,
  processingId,
  rejectComments,
  onToggleExpand,
  onApprove,
  onReject,
  onRejectCommentChange,
}: Props) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>📋 Заявки на рассмотрение</h3>
        <span className={styles.sectionCount}>{applications.length}</span>
      </div>

      {fetching ? (
        <p className={styles.loadingText}>Загрузка заявок...</p>
      ) : applications.length === 0 ? (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>📭</span>
          <p className={styles.emptyText}>Нет заявок на рассмотрение</p>
        </div>
      ) : (
        <div className={styles.applicationsList}>
          {applications.map((app) => (
            <ApplicationCard
              key={app.id}
              app={app}
              isExpanded={expandedId === app.id}
              processing={processingId === app.id}
              rejectComment={rejectComments[app.id] || ''}
              onToggle={() => onToggleExpand(app.id)}
              onApprove={() => onApprove(app.id)}
              onReject={() => onReject(app.id)}
              onRejectCommentChange={(v) => onRejectCommentChange(app.id, v)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
