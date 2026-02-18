import styles from '@/app/(styles)/discord-message-styles/discord-message.module.css';
interface TextareaFieldProps {
  id?: string;
  label: string;
  value: string;
  onChangeMessage: (value: string) => void;
  placeholder: string;
  required?: boolean;
  maxLength: number;
  rows: number;
  showCharCount: boolean;
}

export default function TextareaField({
  id,
  label,
  value,
  onChangeMessage,
  placeholder,
  required,
  maxLength,
  rows,
  showCharCount,
}: TextareaFieldProps) {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        className={styles.textarea}
        value={value}
        onChange={(e) => onChangeMessage(e.target.value)}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        rows={rows}
      />
      {showCharCount && (
        <div className={styles.charCount}>
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
}
