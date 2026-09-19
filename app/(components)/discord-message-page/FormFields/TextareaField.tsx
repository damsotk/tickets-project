import { KeyboardEvent, useRef } from 'react';
import styles from '@/app/(styles)/discord-message-styles/discord-message.module.css';
import MarkdownToolbar from './MarkdownToolbar/MarkdownToolbar';
import {
  applyMarkdownFormat,
  FORMAT_HOTKEYS,
  MarkdownFormat,
} from './MarkdownToolbar/markdown-formats';

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
  showMarkdownToolbar?: boolean;
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
  showMarkdownToolbar = false,
}: TextareaFieldProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFormat = (format: MarkdownFormat) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const result = applyMarkdownFormat(
      value,
      textarea.selectionStart,
      textarea.selectionEnd,
      format,
    );
    if (result.value.length > maxLength) return;

    onChangeMessage(result.value);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(result.selectionStart, result.selectionEnd);
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!showMarkdownToolbar || !(e.ctrlKey || e.metaKey)) return;

    const format = FORMAT_HOTKEYS[e.key.toLowerCase()];
    if (!format) return;

    e.preventDefault();
    handleFormat(format);
  };

  return (
    <div className={styles.inputGroup}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {showMarkdownToolbar && <MarkdownToolbar onFormat={handleFormat} />}
      <textarea
        ref={textareaRef}
        id={id}
        className={`${styles.textarea} ${showMarkdownToolbar ? styles.textareaWithToolbar : ''}`}
        value={value}
        onChange={(e) => onChangeMessage(e.target.value)}
        onKeyDown={handleKeyDown}
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
