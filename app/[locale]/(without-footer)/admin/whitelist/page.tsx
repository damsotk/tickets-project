'use client';

import { AddPlayerForm } from '@/app/(components)/admin-pages/whitelist/AddPlayerForm';
import { ApplicationList } from '@/app/(components)/admin-pages/whitelist/ApplicationList';
import { PlayerList } from '@/app/(components)/admin-pages/whitelist/PlayerList';
import { StatusBar } from '@/app/(components)/admin-pages/whitelist/StatusBar';
import { WhitelistToggle } from '@/app/(components)/admin-pages/whitelist/WhiteListToggle';
import { useApplications } from '@/app/(hooks)/admin-page-hooks/whitelist/useApplication';
import { useStatus } from '@/app/(hooks)/admin-page-hooks/whitelist/useStatus';
import { useWhitelist } from '@/app/(hooks)/admin-page-hooks/whitelist/useWhiteList';
import styles from '@/app/(styles)/admin-styles/whitelist-page.module.css';

export default function WhitelistAdd() {
  const { status, setSuccess, setError, clearStatus } = useStatus();

  const wl = useWhitelist({ setSuccess, setError, clearStatus });

  const apps = useApplications({
    onSuccess: setSuccess,
    onError: setError,
    onWhitelistChange: wl.fetchWhitelist,
  });

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentContainer}>
        <WhitelistToggle
          enabled={wl.enabled}
          toggling={wl.toggling}
          fetching={wl.fetching}
          onToggle={wl.toggle}
        />

        <AddPlayerForm loading={wl.adding} onAdd={wl.addPlayer} />

        {status && <StatusBar status={status} />}

        <ApplicationList
          applications={apps.applications}
          fetching={apps.fetching}
          expandedId={apps.expandedId}
          processingId={apps.processingId}
          rejectComments={apps.rejectComments}
          onToggleExpand={apps.toggleExpand}
          onApprove={apps.approve}
          onReject={apps.reject}
          onRejectCommentChange={apps.setRejectComment}
        />

        <PlayerList players={wl.players} fetching={wl.fetching} />
      </div>
    </div>
  );
}
