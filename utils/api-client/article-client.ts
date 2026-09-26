import { ArticleDraft } from '@/utils/validate-article';

export interface CreateArticleResponse {
  article: { category: string; slug: string };
}

export class ArticleClient {
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

  static async createArticle(draft: ArticleDraft) {
    return this.request<CreateArticleResponse>('/api/articles', {
      method: 'POST',
      body: JSON.stringify(draft),
    });
  }
}
