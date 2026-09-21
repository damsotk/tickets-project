export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: 'USER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
  balance: number;
}

export interface UserSearchResult {
  id: string;
  name: string;
  avatar: string | null;
}

export interface SearchUsersResponse {
  users: UserSearchResult[];
}

export interface AuthResponse {
  user: User;
  message: string;
}

export interface ApiError {
  error: string;
}
