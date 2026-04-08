'use client';
import styles from '@/app/(styles)/auth-styles/auth-styles.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthClient } from '@/utils/api-client/auth-client';
import { useValidateAuthForm } from '@/app/(hooks)/auth-page-hooks/use-validate-auth-form';
import { useAuthFormHandlers } from '@/app/(hooks)/auth-page-hooks/use-auth-form-handlers';
import { useTranslation } from '@/app/(hooks)/use-translation';
import { FormField } from './FormField';
import DiscordButton from './DiscordButton';
import useUser from '@/contexts/UserContext';
import { User } from '@/types/user';

interface LoginResponse {
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

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useUser();
  const { translate } = useTranslation();
  const { validatePassword, validateEmail } = useValidateAuthForm();
  const { formData, fieldErrors, handleChange, handleBlur, handleSubmit, error, loading } =
    useAuthFormHandlers<LoginResponse>(
      { email: '', password: '' },
      { email: validateEmail, password: validatePassword },
      {
        onSuccess: (data: LoginResponse) => {
          setUser(data.user);
          router.push('/');
        },
      },
    );

  const translated = translate.auth;

  const discordError = searchParams.get('error');
  const discordErrorMessage = discordError ? DISCORD_ERROR_MESSAGES[discordError] : null;

  return (
    <div className={styles.formCard}>
      <h1 className={styles.title}>{translated.login.title}</h1>
      <p className={styles.subtitle}>{translated.login.subtitle}</p>

      {error && <div className={styles.error}>{error}</div>}
      {discordErrorMessage && <div className={styles.error}>{discordErrorMessage}</div>}

      <form
        onSubmit={(e) => handleSubmit(e, () => AuthClient.login(formData.email, formData.password))}
        noValidate
      >
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
          {loading ? translated.login.buttonLoading : translated.login.button}
        </button>
      </form>

      <div className={styles.divider}>
        <span className={styles.dividerText}>or</span>
      </div>

      <DiscordButton label={'Continue with Discord'} />
    </div>
  );
}
