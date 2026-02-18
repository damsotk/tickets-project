import styles from '@/app/(styles)/discord-message-styles/discord-message.module.css';

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
  return (
    <>
      <input
        type="url"
        className={styles.input}
        value={customAvatarUrl}
        onChange={(e) => onCustomAvatarChange(e.target.value)}
        placeholder="https://example.com/avatar.png"
      />
      {customAvatarUrl && (
        <div className={styles.avatarPreview}>
          <img src={customAvatarUrl} alt="Custom avatar preview" />
        </div>
      )}
      <button type="button" className={styles.customAvatarBtn} onClick={handleCustomAvatarToggle}>
        Choose from ready-made
      </button>
    </>
  );
}
