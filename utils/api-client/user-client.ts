import { ChangeNameResponse, SearchUsersResponse } from '@/types/user';

export class UserClient {
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

  static async searchUsers(query: string, signal?: AbortSignal) {
    return this.request<SearchUsersResponse>(`/api/users/search?q=${encodeURIComponent(query)}`, {
      signal,
    });
  }

  static async changeName(name: string) {
    return this.request<ChangeNameResponse>('/api/users/name', {
      method: 'PATCH',
      body: JSON.stringify({ name }),
    });
  }
}
