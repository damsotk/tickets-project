'use client';
import styles from '@/app/(styles)/auth-styles/auth-styles.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthClient } from '@/utils/api-client/auth-client';
import { useAuthFormHandlers } from '@/app/(hooks)/auth-page-hooks/use-auth-form-handlers';
import { useValidateAuthForm } from '@/app/(hooks)/auth-page-hooks/use-validate-auth-form';
import { useTranslation } from '@/app/(hooks)/use-translation';
import { FormField } from './FormField';
import DiscordButton from './DiscordButton';
import { User } from '@/types/user';
import useUser from '@/contexts/UserContext';

interface RegisterResponse {
  user: User;
  message: string;
}

const DISCORD_ERROR_MESSAGES: Record<string, string> = {
  discord_denied: 'Discord authorization was cancelled.',
  discord_failed: 'Discord login failed. Please try again.',
  no_email: 'Could not get email from Discord. Please ensure your email is verified.',
  no_code: 'Discord authorization failed. Please try again.',
  rate_limit: 'Too many attempts. Please try again later.',
};

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useUser();
  const { translate } = useTranslation();
  const { validatePassword, validateEmail, validateName } = useValidateAuthForm();
  const { formData, fieldErrors, handleChange, handleBlur, handleSubmit, loading, error } =
    useAuthFormHandlers<RegisterResponse>(
      { name: '', email: '', password: '' },
      { email: validateEmail, password: validatePassword, name: validateName },
      {
        onSuccess: (data: RegisterResponse) => {
          setUser(data.user);
          router.push('/');
          router.refresh();
        },
      },
    );

  const translated = translate.auth;

  const discordError = searchParams.get('error');
  const discordErrorMessage = discordError ? DISCORD_ERROR_MESSAGES[discordError] : null;

  return (
    <div className={styles.formCard}>
      <h1 className={styles.title}>{translated.register.title}</h1>
      <p className={styles.subtitle}>{translated.register.subtitle}</p>

      {error && <div className={styles.error}>{error}</div>}
      {discordErrorMessage && <div className={styles.error}>{discordErrorMessage}</div>}

      <form
        onSubmit={(e) =>
          handleSubmit(e, () =>
            AuthClient.register(formData.name, formData.email, formData.password),
          )
        }
        noValidate
      >
        <FormField
          label={translated.fields.name}
          type="name"
          name="name"
          value={formData.name}
          error={fieldErrors.name}
          placeholder={translated.fields.namePlaceholder}
          onChange={(value) => handleChange('name', value)}
          onBlur={() => handleBlur('name')}
        />

        <FormField
          label={translated.fields.email}
          type="email"
          name="email"
          value={formData.email}
          error={fieldErrors.email}
          placeholder={translated.fields.emailPlaceholder}
          onChange={(value) => handleChange('email', value)}
          onBlur={() => handleBlur('email')}
        />

        <FormField
          label={translated.fields.password}
          type="password"
          name="password"
          value={formData.password}
          error={fieldErrors.password}
          placeholder={translated.fields.passwordPlaceholder}
          onChange={(value) => handleChange('password', value)}
          onBlur={() => handleBlur('password')}
        />

        <button
          type="submit"
          disabled={loading}
          className={`${styles.button} ${loading ? styles['button--loading'] : ''}`}
        >
          {loading ? translated.register.buttonLoading : translated.register.button}
        </button>
      </form>

      <div className={styles.divider}>
        <span className={styles.dividerText}>or</span>
      </div>

      <DiscordButton label={'Continue with Discord'} />
    </div>
  );
}
