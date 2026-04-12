import { useState, useCallback, useEffect } from 'react';
import { Application } from '@/types/whitelist';
import { WhitelistClient } from '@/utils/api-client/whitelist-client';

interface UseApplicationsOptions {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  onWhitelistChange: () => Promise<void>;
}

export function useApplications({ onSuccess, onError, onWhitelistChange }: UseApplicationsOptions) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [fetching, setFetching] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [rejectComments, setRejectComments] = useState<Record<string, string>>({});

  const fetchApplications = useCallback(async () => {
    try {
      const data = await WhitelistClient.getApplications();
      setApplications(data.applications ?? []);
    } catch (err) {
      console.error('Failed to fetch applications:', err);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const toggleExpand = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const setRejectComment = useCallback((id: string, value: string) => {
    setRejectComments((prev) => ({ ...prev, [id]: value }));
  }, []);

  const removeApp = useCallback((id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
    setExpandedId(null);
    setRejectComments((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  }, []);

  const approve = useCallback(
    async (id: string) => {
      setProcessingId(id);
      try {
        const data = await WhitelistClient.approveApplication(id);
        onSuccess(data.message);
        removeApp(id);
        await onWhitelistChange();
      } catch (err) {
        onError(err instanceof Error ? err.message : 'Ошибка при одобрении заявки');
      } finally {
        setProcessingId(null);
      }
    },
    [onSuccess, onError, onWhitelistChange, removeApp],
  );

  const reject = useCallback(
    async (id: string) => {
      setProcessingId(id);
      try {
        const data = await WhitelistClient.rejectApplication(id, rejectComments[id] || null);
        onSuccess(data.message);
        removeApp(id);
      } catch (err) {
        onError(err instanceof Error ? err.message : 'Ошибка при отклонении заявки');
      } finally {
        setProcessingId(null);
      }
    },
    [onSuccess, onError, rejectComments, removeApp],
  );

  return {
    applications,
    fetching,
    expandedId,
    processingId,
    rejectComments,
    toggleExpand,
    setRejectComment,
    approve,
    reject,
  };
}
