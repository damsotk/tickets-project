'use client';
import styles from '@/app/(styles)/discord-message-styles/discord-message.module.css';
import { useDsMsgForm } from '@/app/(hooks)/discord-message-page-hooks/use-ds-msg-form';
import { useTranslation } from '@/app/(hooks)/use-translation';
import Header from '@/app/(components)/discord-message-page/Header';
import InputField from '@/app/(components)/discord-message-page/FormFields/InputField';
import TextareaField from '@/app/(components)/discord-message-page/FormFields/TextareaField';
import AvatarSelectorField from '@/app/(components)/discord-message-page/FormFields/AvatarSelector/AvatarSelectorField';

export default function DiscordMessage() {
  const { translate } = useTranslation();
  const {
    handleChange,
    handleSubmit,
    handleAvatarSelect,
    handleCustomAvatarToggle,
    status,
    loading,
    formData,
    useCustomAvatar,
  } = useDsMsgForm();

  const translated = translate.discordMessage;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.formCard}>
          <Header />

          <form onSubmit={handleSubmit} className={styles.form}>
            <InputField
              label={translated.fields.username}
              id="username"
              value={formData.username}
              onChangeUsername={(value) => handleChange('username', value)}
              placeholder={translated.fields.usernamePlaceholder}
              maxLength={80}
              required
            />
            <AvatarSelectorField
              selectedAvatarUrl={formData.avatarUrl}
              customAvatarUrl={formData.customAvatarUrl}
              useCustomAvatar={useCustomAvatar}
              handleAvatarSelect={handleAvatarSelect}
              handleCustomAvatarToggle={handleCustomAvatarToggle}
              onCustomAvatarChange={(url) => handleChange('customAvatarUrl', url)}
            />
            <TextareaField
              id="message"
              label={translated.fields.message}
              value={formData.message}
              onChangeMessage={(e) => handleChange('message', e)}
              placeholder={translated.fields.messagePlaceholder}
              required={true}
              maxLength={2000}
              rows={6}
              showCharCount={true}
            />

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? translated.button.sending : translated.button.send}
            </button>

            {status === 'success' && (
              <div className={styles.success}>{translated.status.success}</div>
            )}

            {status === 'error' && <div className={styles.error}>{translated.status.error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
