'use client';
import styles from '@/app/(styles)/auth-styles/auth-styles.module.css';
import { useRouter } from 'next/navigation';
import { AuthClient } from '@/utils/api-client/auth-client';
import { useAuthFormHandlers } from '@/app/(hooks)/auth-hooks/use-auth-form-handlers';
import { useValidateAuthForm } from '@/app/(hooks)/auth-hooks/use-validate-auth-form';
import { useTranslation } from '@/app/(hooks)/use-translation';
import { FormField } from './FormField';
import { User } from '@/types/user';
import useUser from '@/contexts/UserContext';

interface RegisterResponse {
  user: User;
  message: string;
}

export default function RegisterForm() {
  const router = useRouter();
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

  const t = translate.auth;

  return (
    <div className={styles.formCard}>
      <h1 className={styles.title}>{t.register.title}</h1>
      <p className={styles.subtitle}>{t.register.subtitle}</p>

      {error && <div className={styles.error}>{error}</div>}

      <form
        onSubmit={(e) =>
          handleSubmit(e, () =>
            AuthClient.register(formData.name, formData.email, formData.password),
          )
        }
        noValidate
      >
        <FormField
          label={t.fields.name}
          type="name"
          name="name"
          value={formData.name}
          error={fieldErrors.name}
          placeholder={t.fields.namePlaceholder}
          onChange={(value) => handleChange('name', value)}
          onBlur={() => handleBlur('name')}
        />

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
          {loading ? t.register.buttonLoading : t.register.button}
        </button>
      </form>
    </div>
  );
}
