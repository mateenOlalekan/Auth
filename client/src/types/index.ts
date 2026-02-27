export type User = {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
};

export type AuthState = {
  user: User | null;
  accessToken: string | null;
};

export type ApiError = {
  message: string;
};
