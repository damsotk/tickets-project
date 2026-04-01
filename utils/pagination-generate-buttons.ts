export interface PaginationButton {
  type: 'page' | 'ellipsis';
  value: number | null;
  key: string;
}
export function generatePaginationButtons(
  currentPage: number,
  totalPages: number,
  maxButtons: number = 7,
): PaginationButton[] {
  const buttons: PaginationButton[] = [];

  if (totalPages <= maxButtons) {
    for (let i = 1; i <= totalPages; i++) {
      buttons.push({
        type: 'page',
        value: i,
        key: `page-${i}`,
      });
    }
  } else {
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        buttons.push({ type: 'page', value: i, key: `page-${i}` });
      }
      buttons.push({ type: 'ellipsis', value: null, key: 'ellipsis-end' });
      buttons.push({ type: 'page', value: totalPages, key: `page-${totalPages}` });
    } else if (currentPage >= totalPages - 3) {
      buttons.push({ type: 'page', value: 1, key: 'page-1' });
      buttons.push({ type: 'ellipsis', value: null, key: 'ellipsis-start' });
      for (let i = totalPages - 4; i <= totalPages; i++) {
        buttons.push({ type: 'page', value: i, key: `page-${i}` });
      }
    } else {
      buttons.push({ type: 'page', value: 1, key: 'page-1' });
      buttons.push({ type: 'ellipsis', value: null, key: 'ellipsis-start' });
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        buttons.push({ type: 'page', value: i, key: `page-${i}` });
      }
      buttons.push({ type: 'ellipsis', value: null, key: 'ellipsis-end' });
      buttons.push({ type: 'page', value: totalPages, key: `page-${totalPages}` });
    }
  }

  return buttons;
}

export function validatePageNumber(
  input: string,
  totalPages: number,
): { isValid: boolean; page: number | null } {
  const pageNum = parseInt(input, 10);

  if (isNaN(pageNum) || pageNum < 1 || pageNum > totalPages) {
    return { isValid: false, page: null };
  }

  return { isValid: true, page: pageNum };
}
