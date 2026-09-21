export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: 'USER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
  balance: number;
  nameChangedAt?: Date | null;
}

export interface UserSearchResult {
  id: string;
  name: string;
  avatar: string | null;
}

export interface SearchUsersResponse {
  users: UserSearchResult[];
}

export interface ChangeNameResponse {
  user: { name: string; nameChangedAt: string };
}

export interface AuthResponse {
  user: User;
  message: string;
}

export interface ApiError {
  error: string;
}
