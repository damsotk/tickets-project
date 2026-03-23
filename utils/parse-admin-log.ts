interface ParsedLog {
  id: string;
  timestamp: string;
  message: string;
}

export function parseLog(log: string, currentPage: number, index: number): ParsedLog {
  const match = log.match(/^\[(.*?)\]\s*(.*)$/);
  if (match) {
    return {
      id: `${currentPage}-${index}`,
      timestamp: match[1],
      message: match[2],
    };
  }
  return {
    id: `${currentPage}-${index}`,
    timestamp: '',
    message: log,
  };
}
