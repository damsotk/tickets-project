'use client';
import styles from '@/app/(styles)/ellium-tickets-styles/auth-styles/auth-styles.module.css';
import { useState } from 'react';
import RegisterForm from '@/app/(components)/auth/RegisterForm';
import LoginForm from '@/app/(components)/auth/LoginForm';

type AuthMode = 'login' | 'register';

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login');

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.waveTransition}>
        <svg viewBox="0 0 120 1200" preserveAspectRatio="none">
          <path
            d="M120,0 C60,200 80,400 40,600 C20,800 80,1000 60,1200 L0,1200 L0,0 Z"
            fill="#1a1a1e"
          ></path>
        </svg>
      </div>

      <div className={styles.contentWrapper}>
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
      </div>
    </div>
  );
}
