export type MarkdownFormat =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'spoiler'
  | 'code'
  | 'codeBlock'
  | 'link'
  | 'heading'
  | 'subtext'
  | 'quote'
  | 'list';

type FormatConfig =
  | { type: 'wrap'; before: string; after: string }
  | { type: 'line'; prefix: string };

export const MARKDOWN_FORMATS: Record<MarkdownFormat, FormatConfig> = {
  bold: { type: 'wrap', before: '**', after: '**' },
  italic: { type: 'wrap', before: '*', after: '*' },
  underline: { type: 'wrap', before: '__', after: '__' },
  strikethrough: { type: 'wrap', before: '~~', after: '~~' },
  spoiler: { type: 'wrap', before: '||', after: '||' },
  code: { type: 'wrap', before: '`', after: '`' },
  codeBlock: { type: 'wrap', before: '```\n', after: '\n```' },
  link: { type: 'wrap', before: '[', after: '](https://)' },
  heading: { type: 'line', prefix: '# ' },
  subtext: { type: 'line', prefix: '-# ' },
  quote: { type: 'line', prefix: '> ' },
  list: { type: 'line', prefix: '- ' },
};

export const FORMAT_HOTKEYS: Record<string, MarkdownFormat> = {
  b: 'bold',
  i: 'italic',
  u: 'underline',
};

interface FormatResult {
  value: string;
  selectionStart: number;
  selectionEnd: number;
}

export function applyMarkdownFormat(
  value: string,
  selectionStart: number,
  selectionEnd: number,
  format: MarkdownFormat,
): FormatResult {
  const config = MARKDOWN_FORMATS[format];
  const selected = value.slice(selectionStart, selectionEnd);

  if (config.type === 'wrap') {
    const { before, after } = config;
    const isWrapped =
      value.slice(selectionStart - before.length, selectionStart) === before &&
      value.slice(selectionEnd, selectionEnd + after.length) === after;

    if (isWrapped) {
      return {
        value:
          value.slice(0, selectionStart - before.length) +
          selected +
          value.slice(selectionEnd + after.length),
        selectionStart: selectionStart - before.length,
        selectionEnd: selectionEnd - before.length,
      };
    }

    return {
      value: value.slice(0, selectionStart) + before + selected + after + value.slice(selectionEnd),
      selectionStart: selectionStart + before.length,
      selectionEnd: selectionEnd + before.length,
    };
  }

  const { prefix } = config;
  const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
  const lines = value.slice(lineStart, selectionEnd).split('\n');
  const allPrefixed = lines.every((line) => line.startsWith(prefix));

  const updated = lines
    .map((line) => (allPrefixed ? line.slice(prefix.length) : prefix + line))
    .join('\n');
  const shift = allPrefixed ? -prefix.length : prefix.length;

  return {
    value: value.slice(0, lineStart) + updated + value.slice(selectionEnd),
    selectionStart: Math.max(lineStart, selectionStart + shift),
    selectionEnd: lineStart + updated.length,
  };
}
