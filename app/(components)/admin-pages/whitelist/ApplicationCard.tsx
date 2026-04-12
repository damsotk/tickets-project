import { Application } from '@/types/whitelist';
import { formateDateWhiteList } from '@/utils/format-date';

interface Props {
  app: Application;
  isExpanded: boolean;
  processing: boolean;
  rejectComment: string;
  onToggle: () => void;
  onApprove: () => void;
  onReject: () => void;
  onRejectCommentChange: (value: string) => void;
}

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  color: '#9ca3af',
  textTransform: 'uppercase',
  fontWeight: 600,
  letterSpacing: 0.5,
};

const answerStyle: React.CSSProperties = {
  margin: '4px 0 0',
  fontSize: 14,
  background: '#f9fafb',
  padding: '8px 12px',
  borderRadius: 6,
};

export function ApplicationCard({
  app,
  isExpanded,
  processing,
  rejectComment,
  onToggle,
  onApprove,
  onReject,
  onRejectCommentChange,
}: Props) {
  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 10,
        overflow: 'hidden',
        background: '#fff',
      }}
    >
      <div
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          cursor: 'pointer',
          background: isExpanded ? '#f9fafb' : '#fff',
          transition: 'background 0.15s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img
            src={`https://mc-heads.net/avatar/${app.minecraftNick}/28`}
            alt={app.minecraftNick}
            width={28}
            height={28}
            style={{ borderRadius: 4 }}
          />
          <div>
            <span style={{ fontWeight: 600, fontSize: 14 }}>{app.minecraftNick}</span>
            <span style={{ fontSize: 12, color: '#6b7280', marginLeft: 8 }}>{app.discordNick}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, color: '#9ca3af' }}>
            {formateDateWhiteList(app.createdAt)}
          </span>
          <span
            style={{
              fontSize: 16,
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          >
            ▼
          </span>
        </div>
      </div>

      {isExpanded && (
        <div style={{ padding: '0 16px 16px', borderTop: '1px solid #f3f4f6' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
            <div>
              <span style={labelStyle}>Аккаунт на сайте</span>
              <p style={{ margin: '4px 0 0', fontSize: 14 }}>{app.user.name}</p>
            </div>
            <div>
              <span style={labelStyle}>Email</span>
              <p style={{ margin: '4px 0 0', fontSize: 14 }}>{app.user.email}</p>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ marginBottom: 12 }}>
              <span style={labelStyle}>Откуда узнал о сервере</span>
              <p style={answerStyle}>{app.source}</p>
            </div>
            <div style={{ marginBottom: 12 }}>
              <span style={labelStyle}>Опыт в RP</span>
              <p style={answerStyle}>{app.rpExperience}</p>
            </div>
            {app.plans && (
              <div style={{ marginBottom: 12 }}>
                <span style={labelStyle}>Планы на сервере</span>
                <p style={answerStyle}>{app.plans}</p>
              </div>
            )}
          </div>

          <div style={{ marginTop: 12 }}>
            <input
              type="text"
              placeholder="Причина отказа (необязательно)"
              value={rejectComment}
              onChange={(e) => onRejectCommentChange(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 6,
                border: '1px solid #e5e7eb',
                fontSize: 13,
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'flex-end' }}>
            <button
              onClick={onReject}
              disabled={processing}
              style={{
                padding: '8px 20px',
                borderRadius: 6,
                border: '1px solid #fca5a5',
                background: processing ? '#999' : '#fff',
                color: processing ? '#fff' : '#dc2626',
                cursor: processing ? 'not-allowed' : 'pointer',
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              {processing ? '...' : 'Отклонить'}
            </button>
            <button
              onClick={onApprove}
              disabled={processing}
              style={{
                padding: '8px 20px',
                borderRadius: 6,
                border: 'none',
                background: processing ? '#999' : '#16a34a',
                color: '#fff',
                cursor: processing ? 'not-allowed' : 'pointer',
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              {processing ? '...' : 'Одобрить'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
