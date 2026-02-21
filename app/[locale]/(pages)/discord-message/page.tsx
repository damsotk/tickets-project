'use client';
import styles from '@/app/(styles)/discord-message-styles/discord-message.module.css';
import { useDsMsgForm } from '@/app/(hooks)/discord-message-hooks/use-ds-msg-form';
import Header from '@/app/(components)/discord-message-page/Header';
import InputField from '@/app/(components)/discord-message-page/FormFields/InputField';
import TextareaField from '@/app/(components)/discord-message-page/FormFields/TextareaField';
import AvatarSelectorField from '@/app/(components)/discord-message-page/FormFields/AvatarSelector/AvatarSelectorField';

export default function DiscordMessage() {
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

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.formCard}>
          <Header />

          <form onSubmit={handleSubmit} className={styles.form}>
            <InputField
              label="Sender name"
              id="username"
              value={formData.username}
              onChangeUsername={(value) => handleChange('username', value)}
              placeholder="Type your name"
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
              label="Message"
              value={formData.message}
              onChangeMessage={(e) => handleChange('message', e)}
              placeholder="Your message..."
              required={true}
              maxLength={2000}
              rows={6}
              showCharCount={true}
            />

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? 'Sending...' : 'Send'}
            </button>

            {status === 'success' && (
              <div className={styles.success}>✓ Message sent successfully!</div>
            )}

            {status === 'error' && (
              <div className={styles.error}>✗ Error sending. Please try again.</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
