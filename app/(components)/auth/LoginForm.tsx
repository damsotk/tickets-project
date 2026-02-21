'use client';
import styles from '@/app/(styles)/auth-styles/auth-styles.module.css';
import { useRouter } from 'next/navigation';
import { AuthClient } from '@/utils/api-client/auth-client';
import { useValidateAuthForm } from '@/app/(hooks)/auth-hooks/use-validate-auth-form';
import { useAuthFormHandlers } from '@/app/(hooks)/auth-hooks/use-auth-form-handlers';
import { useTranslation } from '@/app/(hooks)/use-translation';
import { FormField } from './FormField';
import useUser from '@/contexts/UserContext';
import { User } from '@prisma/client';

interface LoginResponse {
  user: User;
  message: string;
}

export default function LoginForm() {
  const router = useRouter();
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

  const t = translate.auth;

  return (
    <div className={styles.formCard}>
      <h1 className={styles.title}>{t.login.title}</h1>
      <p className={styles.subtitle}>{t.login.subtitle}</p>

      {error && <div className={styles.error}>{error}</div>}

      <form
        onSubmit={(e) => handleSubmit(e, () => AuthClient.login(formData.email, formData.password))}
        noValidate
      >
        <FormField
          label={t.fields.email}
          type="email"
          name="email"
          value={formData.email}
          error={fieldErrors.email}
          placeholder={t.fields.emailPlaceholder}
          onChange={(value) => handleChange('email', value)}
          onBlur={() => handleBlur('email')}
        />

        <FormField
          label={t.fields.password}
          type="password"
          name="password"
          value={formData.password}
          error={fieldErrors.password}
          placeholder={t.fields.passwordPlaceholder}
          onChange={(value) => handleChange('password', value)}
          onBlur={() => handleBlur('password')}
        />

        <button
          type="submit"
          disabled={loading}
          className={`${styles.button} ${loading ? styles['button--loading'] : ''}`}
        >
          {loading ? t.login.buttonLoading : t.login.button}
        </button>
      </form>
    </div>
  );
}
