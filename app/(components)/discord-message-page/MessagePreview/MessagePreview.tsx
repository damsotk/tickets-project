import { useMemo } from 'react';
import styles from '@/app/(styles)/discord-message-styles/discord-preview.module.css';
import formStyles from '@/app/(styles)/discord-message-styles/discord-message.module.css';
import { useTranslation } from '@/app/(hooks)/use-translation';
import { PRESET_AVATARS } from '@/constants/urls_default_icons_ds';
import { parseDiscordMarkdown } from './parse-discord-markdown';

interface MessagePreviewProps {
  username: string;
  avatarUrl: string;
  message: string;
}

const INTL_LOCALES: Record<string, string> = { en: 'en-US', uk: 'uk-UA', ru: 'ru-RU', by: 'be-BY' };

export default function MessagePreview({ username, avatarUrl, message }: MessagePreviewProps) {
  const { translate, locale } = useTranslation();
  const translated = translate.discordMessage.preview;

  const content = useMemo(() => parseDiscordMarkdown(message), [message]);
  const time = new Intl.DateTimeFormat(INTL_LOCALES[locale] ?? 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

  return (
    <div className={formStyles.inputGroup}>
      <span className={formStyles.label}>{translated.title}</span>

      <div className={styles.preview}>
        <img
          className={styles.avatar}
          src={avatarUrl || PRESET_AVATARS[0]}
          alt=""
          onError={(e) => {
            if (e.currentTarget.src !== PRESET_AVATARS[0]) e.currentTarget.src = PRESET_AVATARS[0];
          }}
        />

        <div className={styles.body}>
          <div className={styles.meta}>
            <span className={styles.username}>{username.trim() || translated.defaultUsername}</span>
            <span className={styles.appTag}>{translated.appTag}</span>
            <span className={styles.timestamp} suppressHydrationWarning>
              {translated.today} {time}
            </span>
          </div>

          {message.trim() ? (
            <div className={styles.content}>{content}</div>
          ) : (
            <div className={styles.empty}>{translated.empty}</div>
          )}
        </div>
      </div>
    </div>
  );
}
