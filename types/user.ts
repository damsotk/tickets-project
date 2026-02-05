export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: 'USER' | 'ADMIN';
}

export interface AuthResponse {
  user: User;
  message: string;
}

export interface ApiError {
  error: string;
}
