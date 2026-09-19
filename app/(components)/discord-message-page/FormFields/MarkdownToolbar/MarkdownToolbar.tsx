import styles from '@/app/(styles)/discord-message-styles/discord-message.module.css';
import { useTranslation } from '@/app/(hooks)/use-translation';
import { MarkdownFormat } from './markdown-formats';

interface MarkdownToolbarProps {
  onFormat: (format: MarkdownFormat) => void;
}

const BUTTONS: { format: MarkdownFormat; icon: string; className?: string }[] = [
  { format: 'bold', icon: 'B', className: styles.toolbarBold },
  { format: 'italic', icon: 'I', className: styles.toolbarItalic },
  { format: 'underline', icon: 'U', className: styles.toolbarUnderline },
  { format: 'strikethrough', icon: 'S', className: styles.toolbarStrike },
  { format: 'spoiler', icon: '||' },
  { format: 'code', icon: '</>' },
  { format: 'codeBlock', icon: '{ }' },
  { format: 'link', icon: '🔗' },
  { format: 'heading', icon: 'H' },
  { format: 'subtext', icon: '-#' },
  { format: 'quote', icon: '❝' },
  { format: 'list', icon: '•' },
];

export default function MarkdownToolbar({ onFormat }: MarkdownToolbarProps) {
  const { translate } = useTranslation();
  const translated = translate.discordMessage.markdown;

  return (
    <div className={styles.toolbar}>
      {BUTTONS.map(({ format, icon, className }) => (
        <button
          key={format}
          type="button"
          className={`${styles.toolbarButton} ${className ?? ''}`}
          title={translated[format]}
          aria-label={translated[format]}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onFormat(format)}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}
