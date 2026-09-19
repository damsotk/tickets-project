import { ReactNode } from 'react';
import styles from '@/app/(styles)/discord-message-styles/discord-preview.module.css';
import Spoiler from './Spoiler';

type InlineRule = {
  match: (source: string, prevChar: string) => RegExpExecArray | null;
  render: (match: RegExpExecArray, key: string) => ReactNode;
};

const anchored = (re: RegExp) => (source: string) => re.exec(source);

const CODE_BLOCK_RE = /```(?:([\w+#.-]+)\n)?\n?([\s\S]*?)\n?```/g;

const inlineRules: InlineRule[] = [
  {
    match: anchored(/^\\([^0-9A-Za-z\s])/),
    render: (m) => m[1],
  },
  {
    match: anchored(/^(`+)([\s\S]*?[^`])\1(?!`)/),
    render: (m, key) => (
      <code key={key} className={styles.inlineCode}>
        {m[2]}
      </code>
    ),
  },
  {
    match: anchored(/^\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)/),
    render: (m, key) => (
      <a key={key} className={styles.link} href={m[2]} target="_blank" rel="noopener noreferrer">
        {parseInline(m[1], key)}
      </a>
    ),
  },
  {
    match: anchored(/^<(https?:\/\/[^\s>]+)>/),
    render: (m, key) => (
      <a key={key} className={styles.link} href={m[1]} target="_blank" rel="noopener noreferrer">
        {m[1]}
      </a>
    ),
  },
  {
    match: anchored(/^https?:\/\/[^\s<]+[^<.,:;"')\]\s]/),
    render: (m, key) => (
      <a key={key} className={styles.link} href={m[0]} target="_blank" rel="noopener noreferrer">
        {m[0]}
      </a>
    ),
  },
  {
    match: anchored(/^__([\s\S]+?)__(?!_)/),
    render: (m, key) => <u key={key}>{parseInline(m[1], key)}</u>,
  },
  {
    match: anchored(/^\*\*([\s\S]+?)\*\*(?!\*)/),
    render: (m, key) => <strong key={key}>{parseInline(m[1], key)}</strong>,
  },
  {
    match: anchored(
      /^\*(?=\S)((?:\*\*|\\[\s\S]|\s+(?:\\[\s\S]|[^\s*\\]|\*\*)|[^\s*\\])+?)\*(?!\*)/,
    ),
    render: (m, key) => <em key={key}>{parseInline(m[1], key)}</em>,
  },
  {
    match: (source, prevChar) =>
      /\w/.test(prevChar) ? null : /^_((?:__|\\[\s\S]|[^\\_])+?)_(?!\w)/.exec(source),
    render: (m, key) => <em key={key}>{parseInline(m[1], key)}</em>,
  },
  {
    match: anchored(/^~~([\s\S]+?)~~/),
    render: (m, key) => <s key={key}>{parseInline(m[1], key)}</s>,
  },
  {
    match: anchored(/^\|\|([\s\S]+?)\|\|/),
    render: (m, key) => <Spoiler key={key}>{parseInline(m[1], key)}</Spoiler>,
  },
];

const INLINE_TRIGGERS = new Set(['\\', '`', '[', '<', 'h', '_', '*', '~', '|']);

function parseInline(text: string, keyPrefix = 'i'): ReactNode[] {
  const nodes: ReactNode[] = [];
  let plain = '';
  let pos = 0;

  while (pos < text.length) {
    const char = text[pos];
    let matched = false;

    if (INLINE_TRIGGERS.has(char)) {
      const rest = text.slice(pos);
      const prevChar = pos > 0 ? text[pos - 1] : '';

      for (const rule of inlineRules) {
        const match = rule.match(rest, prevChar);
        if (!match) continue;

        if (plain) {
          nodes.push(plain);
          plain = '';
        }
        nodes.push(rule.render(match, `${keyPrefix}-${pos}`));
        pos += match[0].length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      plain += char;
      pos++;
    }
  }

  if (plain) nodes.push(plain);
  return nodes;
}

const HEADING_RE = /^(#{1,3}) +(\S.*)$/;
const SUBTEXT_RE = /^-# +(\S.*)$/;
const QUOTE_RE = /^> ?(.*)$/;
const MULTILINE_QUOTE_RE = /^>>> ?([\s\S]*)$/;
const LIST_RE = /^( *)([-*]|\d+\.) +(\S.*)$/;

const isQuoteLine = (line: string) => line.startsWith('> ') || line === '>';

interface ListItem {
  indent: number;
  ordered: boolean;
  number: number;
  content: string;
}

function renderList(items: ListItem[], key: string): ReactNode {
  const ordered = items[0].ordered;
  const Tag = ordered ? 'ol' : 'ul';

  return (
    <Tag key={key} className={styles.list} start={ordered ? items[0].number : undefined}>
      {items.map((item, index) => (
        <li key={index} style={{ marginLeft: `${Math.floor(item.indent / 2) * 16}px` }}>
          {parseInline(item.content, `${key}-${index}`)}
        </li>
      ))}
    </Tag>
  );
}

function parseLines(text: string, keyPrefix: string, inQuote: boolean): ReactNode[] {
  const nodes: ReactNode[] = [];
  const lines = text.split('\n');
  let paragraph: string[] = [];
  let i = 0;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    nodes.push(
      <span key={`${keyPrefix}-p${i}`}>
        {parseInline(paragraph.join('\n'), `${keyPrefix}-p${i}`)}
      </span>,
    );
    paragraph = [];
  };

  while (i < lines.length) {
    const line = lines[i];
    const key = `${keyPrefix}-${i}`;

    if (!inQuote) {
      const multiline = MULTILINE_QUOTE_RE.exec(line);
      if (multiline) {
        flushParagraph();
        const content = [multiline[1], ...lines.slice(i + 1)].join('\n');
        nodes.push(
          <blockquote key={key} className={styles.quote}>
            {parseLines(content, key, true)}
          </blockquote>,
        );
        break;
      }

      if (isQuoteLine(line)) {
        flushParagraph();
        const quoted: string[] = [];
        while (i < lines.length && isQuoteLine(lines[i])) {
          quoted.push(QUOTE_RE.exec(lines[i])![1]);
          i++;
        }
        nodes.push(
          <blockquote key={key} className={styles.quote}>
            {parseLines(quoted.join('\n'), key, true)}
          </blockquote>,
        );
        continue;
      }
    }

    const heading = HEADING_RE.exec(line);
    if (heading) {
      flushParagraph();
      const level = heading[1].length as 1 | 2 | 3;
      const Tag = `h${level}` as const;
      nodes.push(
        <Tag key={key} className={styles[`heading${level}`]}>
          {parseInline(heading[2], key)}
        </Tag>,
      );
      i++;
      continue;
    }

    const subtext = SUBTEXT_RE.exec(line);
    if (subtext) {
      flushParagraph();
      nodes.push(
        <small key={key} className={styles.subtext}>
          {parseInline(subtext[1], key)}
        </small>,
      );
      i++;
      continue;
    }

    if (LIST_RE.test(line)) {
      flushParagraph();
      const items: ListItem[] = [];
      while (i < lines.length) {
        const item = LIST_RE.exec(lines[i]);
        if (!item) break;
        const ordered = /\d/.test(item[2]);
        if (items.length > 0 && items[0].ordered !== ordered && item[1].length === 0) break;
        items.push({
          indent: item[1].length,
          ordered,
          number: ordered ? parseInt(item[2], 10) : 0,
          content: item[3],
        });
        i++;
      }
      nodes.push(renderList(items, key));
      continue;
    }

    paragraph.push(line);
    i++;
  }

  flushParagraph();
  return nodes;
}

export function parseDiscordMarkdown(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  CODE_BLOCK_RE.lastIndex = 0;

  while ((match = CODE_BLOCK_RE.exec(text)) !== null) {
    const before = text.slice(lastIndex, match.index).replace(/\n$/, '');
    if (before) nodes.push(...parseLines(before, `b${lastIndex}`, false));

    nodes.push(
      <pre key={`code-${match.index}`} className={styles.codeBlock}>
        <code>{match[2]}</code>
      </pre>,
    );

    lastIndex = match.index + match[0].length;
    if (text[lastIndex] === '\n') lastIndex++;
  }

  const rest = text.slice(lastIndex);
  if (rest) nodes.push(...parseLines(rest, `b${lastIndex}`, false));

  return nodes;
}
