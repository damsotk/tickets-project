interface OnlineData {
  players: string[];
  count: number;
}

interface LogsResponse {
  page: number;
  totalPages: number;
  totalLogs: number;
  count: number;
  logs: string[];
}

interface LogsParams {
  player?: string;
  category?: string;
  page?: number;
}

export class MinecraftInfoClient {
  private static async request<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    return data;
  }

  static async getOnlinePlayers() {
    return this.request<OnlineData>('/api/server-online');
  }

  static async getLogs(params: LogsParams) {
    const searchParams = new URLSearchParams();

    if (params.player) searchParams.set('player', params.player);
    if (params.category) searchParams.set('category', params.category);
    searchParams.set('page', (params.page || 1).toString());

    return this.request<LogsResponse>(`/api/get-server-logs?${searchParams.toString()}`);
  }
}
