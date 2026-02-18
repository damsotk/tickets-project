import styles from '@/app/(styles)/discord-message-styles/discord-message.module.css';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeUsername: (value: string) => void;
  placeholder: string;
  maxLength: number;
  required?: boolean;
  id?: string;
}

export default function InputField({
  label,
  value,
  onChangeUsername,
  placeholder,
  maxLength,
  required = false,
  id,
}: InputFieldProps) {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        type="text"
        id={id}
        className={styles.input}
        value={value}
        onChange={(e) => onChangeUsername(e.target.value)}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
      />
    </div>
  );
}
