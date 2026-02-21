import styles from '@/app/(styles)/discord-message-styles/discord-message.module.css';
import { useTranslation } from '@/app/(hooks)/use-translation';

interface CustomAvatarProps {
  customAvatarUrl: string;
  onCustomAvatarChange: (url: string) => void;
  handleCustomAvatarToggle: () => void;
}

export default function CustomAvatar({
  customAvatarUrl,
  onCustomAvatarChange,
  handleCustomAvatarToggle,
}: CustomAvatarProps) {
  const { translate } = useTranslation();
  const t = translate.discordMessage.avatar;

  return (
    <>
      <input
        type="url"
        className={styles.input}
        value={customAvatarUrl}
        onChange={(e) => onCustomAvatarChange(e.target.value)}
        placeholder={t.customPlaceholder}
      />
      {customAvatarUrl && (
        <div className={styles.avatarPreview}>
          <img src={customAvatarUrl} alt={t.customPreview} />
        </div>
      )}
      <button type="button" className={styles.customAvatarBtn} onClick={handleCustomAvatarToggle}>
        {t.chooseFromPreset}
      </button>
    </>
  );
}
