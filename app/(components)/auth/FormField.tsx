import styles from '@/app/(styles)/ellium-tickets-styles/auth-styles/auth-styles.module.css';

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  error?: string;
  placeholder?: string;
  helper?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  minLength?: number;
}

export function FormField({
  label,
  type,
  name,
  value,
  error,
  placeholder,
  onChange,
  onBlur,
}: FormFieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
        className={`${styles.input} ${error ? styles['input--error'] : ''}`}
        placeholder={placeholder}
      />
      {error && (
        <span id={`${name}-error`} className={styles.fieldError} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
