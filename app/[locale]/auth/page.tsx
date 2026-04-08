'use client';
import styles from '@/app/(styles)/auth-styles/auth-styles.module.css';
import { Suspense, useState } from 'react';
import RegisterForm from '@/app/(components)/auth-page/RegisterForm';
import LoginForm from '@/app/(components)/auth-page/LoginForm';

type AuthMode = 'login' | 'register';

function AuthContent() {
  const [mode, setMode] = useState<AuthMode>('login');

  return (
    <>
      <div className={styles.authToggle}>
        <button
          className={`${styles.toggleButton} ${mode === 'login' ? styles.toggleButtonActive : ''}`}
          onClick={() => setMode('login')}
        >
          Login
        </button>
        <button
          className={`${styles.toggleButton} ${mode === 'register' ? styles.toggleButtonActive : ''}`}
          onClick={() => setMode('register')}
        >
          Register
        </button>
      </div>

      <div className={styles.formContainer}>
        {mode === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>
    </>
  );
}

export default function AuthPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.waveTransition}>
        <svg viewBox="0 0 120 1200" preserveAspectRatio="none">
          <path
            d="M120,0 C40,300 40,600 80,900 C100,1050 120,1150 120,1200 L0,1200 L0,0 Z"
            fill="#1a1a1e"
          ></path>
        </svg>
      </div>

      <div className={styles.contentWrapper}>
        <Suspense fallback={null}>
          <AuthContent />
        </Suspense>
      </div>
    </div>
  );
}
