import { AuthToken, LoginCredentials } from '@adi/types';

const TOKEN_KEY  = 'adi_access_token';
const REFRESH_KEY = 'adi_refresh_token';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthToken> {
    const res = await fetch('/api/auth/login', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(credentials),
    });
    if (!res.ok) throw new Error('Login failed');
    const token: AuthToken = await res.json();
    localStorage.setItem(TOKEN_KEY,   token.accessToken);
    localStorage.setItem(REFRESH_KEY, token.refreshToken);
    return token;
  },

  async refreshToken(): Promise<AuthToken> {
    const refresh = localStorage.getItem(REFRESH_KEY);
    if (!refresh) throw new Error('No refresh token');
    const res = await fetch('/api/auth/refresh', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ refreshToken: refresh }),
    });
    if (!res.ok) throw new Error('Token refresh failed');
    const token: AuthToken = await res.json();
    localStorage.setItem(TOKEN_KEY,   token.accessToken);
    localStorage.setItem(REFRESH_KEY, token.refreshToken);
    return token;
  },

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },

  getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  isTokenExpired(expiresAt: number): boolean {
    return Date.now() >= expiresAt * 1000;
  },
};
