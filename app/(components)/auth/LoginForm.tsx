'use client';
import styles from '@/app/(styles)/auth-styles/auth-styles.module.css';
import { useRouter } from 'next/navigation';
import { AuthClient } from '@/utils/api-client/auth-client';
import { useValidateAuthForm } from '@/app/(hooks)/auth-hooks/use-validate-auth-form';
import { useAuthFormHandlers } from '@/app/(hooks)/auth-hooks/use-auth-form-handlers';
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

  return (
    <div className={styles.formCard}>
      <h1 className={styles.title}>Welcome back!</h1>
      <p className={styles.subtitle}>We&apos;re happy to see you again!</p>

      {error && <div className={styles.error}>{error}</div>}

      <form
        onSubmit={(e) => handleSubmit(e, () => AuthClient.login(formData.email, formData.password))}
        noValidate
      >
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
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
}
