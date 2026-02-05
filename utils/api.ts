export class ApiClient {
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

  static async getCurrentUser() {
    return this.request<{ user: any }>('/api/auth/me');
  }

  static async login(email: string, password: string) {
    return this.request<{ user: any; message: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  static async register(name: string, email: string, password: string) {
    return this.request<{ user: any; message: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  static async logout() {
    return this.request<{ message: string }>('/api/auth/logout', {
      method: 'POST',
    });
  }
}
