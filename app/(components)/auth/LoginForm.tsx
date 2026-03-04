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

  const translated = translate.auth;

  return (
    <div className={styles.formCard}>
      <h1 className={styles.title}>{translated.login.title}</h1>
      <p className={styles.subtitle}>{translated.login.subtitle}</p>

      {error && <div className={styles.error}>{error}</div>}

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
    </div>
  );
}
