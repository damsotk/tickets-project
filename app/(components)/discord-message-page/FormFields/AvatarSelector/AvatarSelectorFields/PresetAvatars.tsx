import styles from '@/app/(styles)/discord-message-styles/discord-message.module.css';
import { PRESET_AVATARS } from '@/constants/urls_default_icons_ds';

interface PresetAvatarsProps {
  selectedAvatarUrl: string;
  handleAvatarSelect: (url: string) => void;
  handleCustomAvatarToggle: () => void;
}

export default function PresetAvatars({
  selectedAvatarUrl,
  handleAvatarSelect,
  handleCustomAvatarToggle,
}: PresetAvatarsProps) {
  return (
    <>
      <div className={styles.avatarGrid}>
        {PRESET_AVATARS.map((url, index) => (
          <button
            key={url}
            type="button"
            className={`${styles.avatarOption} ${selectedAvatarUrl === url ? styles.avatarActive : ''}`}
            onClick={() => handleAvatarSelect(url)}
          >
            <img src={url} alt={`Avatar ${index + 1}`} />
          </button>
        ))}
      </div>
      <button type="button" className={styles.customAvatarBtn} onClick={handleCustomAvatarToggle}>
        Use own url
      </button>
    </>
  );
}
