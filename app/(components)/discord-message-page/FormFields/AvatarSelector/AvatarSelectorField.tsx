import styles from '@/app/(styles)/discord-message-styles/discord-message.module.css';
import { useTranslation } from '@/app/(hooks)/use-translation';
import PresetAvatars from '@/app/(components)/discord-message-page/FormFields/AvatarSelector/AvatarSelectorFields/PresetAvatars';
import CustomAvatar from './AvatarSelectorFields/CustomAvatar';

interface AvatarSelectorProps {
  selectedAvatarUrl: string;
  customAvatarUrl: string;
  useCustomAvatar: boolean;
  handleAvatarSelect: (url: string) => void;
  onCustomAvatarChange: (url: string) => void;
  handleCustomAvatarToggle: () => void;
}

export default function AvatarSelectorField({
  selectedAvatarUrl,
  customAvatarUrl,
  useCustomAvatar,
  handleAvatarSelect,
  onCustomAvatarChange,
  handleCustomAvatarToggle,
}: AvatarSelectorProps) {
  const { translate } = useTranslation();
  const t = translate.discordMessage.fields;

  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{t.avatar}</label>

      {!useCustomAvatar ? (
        <PresetAvatars
          selectedAvatarUrl={selectedAvatarUrl}
          handleAvatarSelect={handleAvatarSelect}
          handleCustomAvatarToggle={handleCustomAvatarToggle}
        />
      ) : (
        <CustomAvatar
          customAvatarUrl={customAvatarUrl}
          onCustomAvatarChange={onCustomAvatarChange}
          handleCustomAvatarToggle={handleCustomAvatarToggle}
        />
      )}
    </div>
  );
}
