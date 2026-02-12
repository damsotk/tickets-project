export function truncateName(name: string, maxLength: number = 15): string {
  if (name.length <= maxLength) return name;
  return name.slice(0, maxLength) + '...';
}
