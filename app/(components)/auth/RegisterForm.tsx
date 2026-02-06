'use client';
import styles from '@/app/(styles)/ellium-tickets-styles/auth-styles/auth-styles.module.css';
import { useRouter } from 'next/navigation';
import { AuthClient } from '@/utils/api/auth-client';
import { useAuthFormHandlers } from '@/app/(hooks)/ellium-tickets-hooks/validate-hooks/auth/use-auth-form-handlers';
import { useValidateAuthForm } from '@/app/(hooks)/ellium-tickets-hooks/validate-hooks/auth/use-validate-auth-form';
import { FormField } from './FormField';

export default function RegisterForm() {
  const router = useRouter();
  const { validatePassword, validateEmail, validateName } = useValidateAuthForm();
  const { formData, fieldErrors, handleChange, handleBlur, handleSubmit, loading, error } =
    useAuthFormHandlers(
      { name: '', email: '', password: '' },
      { email: validateEmail, password: validatePassword, name: validateName },
      {
        onSuccess: () => {
          router.push('/');
          router.refresh();
        },
      },
    );

  return (
    <div className={styles.formCard}>
      <h1 className={styles.title}>Create an account</h1>
      <p className={styles.subtitle}>Join us and start your journey!</p>

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
          label="Name"
          type="name"
          name="name"
          value={formData.name}
          error={fieldErrors.name}
          placeholder="Enter your name"
          onChange={(value) => handleChange('name', value)}
          onBlur={() => handleBlur('name')}
        />

        <FormField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          error={fieldErrors.email}
          placeholder="Enter your email"
          onChange={(value) => handleChange('email', value)}
          onBlur={() => handleBlur('email')}
        />

        <FormField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          error={fieldErrors.password}
          placeholder="Enter your password"
          onChange={(value) => handleChange('password', value)}
          onBlur={() => handleBlur('password')}
        />

        <button
          type="submit"
          disabled={loading}
          className={`${styles.button} ${loading ? styles['button--loading'] : ''}`}
        >
          {loading ? 'Creating account...' : 'Continue'}
        </button>
      </form>
    </div>
  );
}
