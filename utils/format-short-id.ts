export function formatShortId(id: string, length: number = 6): string {
  return `#${id.slice(-length)}`;
}
