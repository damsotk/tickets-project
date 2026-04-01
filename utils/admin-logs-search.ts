export interface SearchFormData {
  player: string;
  category: string;
  search: string;
}

export interface NormalizedSearchParams {
  player: string;
  category: string;
  search: string;
}

export function normalizeSearchParams(data: SearchFormData): NormalizedSearchParams {
  return {
    player: data.player.trim(),
    category: data.category,
    search: data.search.trim(),
  };
}

export function isSearchValid(params: NormalizedSearchParams): boolean {
  return !!(params.player || params.category);
}

export function formatCategoryLabel(
  categoryValue: string,
  categories: Array<{ value: string; icon: string; label: string }>,
): string {
  const category = categories.find((c) => c.value === categoryValue);
  return category ? `${category.icon} ${category.label}` : categoryValue;
}
