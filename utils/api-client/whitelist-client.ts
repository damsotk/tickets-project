import {
  WhitelistResponse,
  ToggleResponse,
  AddPlayerResponse,
  ApplicationsResponse,
  ApplicationActionResponse,
} from '@/types/whitelist';

export class WhitelistClient {
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

  static async getWhitelist() {
    return this.request<WhitelistResponse>('/api/white-list/added-players');
  }

  static async addPlayer(player: string) {
    return this.request<AddPlayerResponse>('/api/white-list/add-player', {
      method: 'PUT',
      body: JSON.stringify({ player }),
    });
  }

  static async toggle(state: boolean) {
    return this.request<ToggleResponse>('/api/white-list/toggle', {
      method: 'PUT',
      body: JSON.stringify({ state }),
    });
  }

  static async getApplications() {
    return this.request<ApplicationsResponse>('/api/white-list/admin/applications');
  }

  static async approveApplication(appId: string) {
    return this.request<ApplicationActionResponse>(
      `/api/white-list/admin/applications/${appId}/approve`,
      { method: 'PUT', body: JSON.stringify({}) },
    );
  }

  static async rejectApplication(appId: string, reviewComment: string | null) {
    return this.request<ApplicationActionResponse>(
      `/api/white-list/admin/applications/${appId}/reject`,
      { method: 'PUT', body: JSON.stringify({ reviewComment }) },
    );
  }
}
