// Simple auth service for standalone components
const TOKEN_KEY = 'gadagi_token';
const REFRESH_KEY = 'gadagi_refresh_token';

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  async login(credentials: { email: string; password: string }): Promise<AuthToken> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const token: AuthToken = await response.json();
    localStorage.setItem(TOKEN_KEY, token.accessToken);
    localStorage.setItem(REFRESH_KEY, token.refreshToken);
    return token;
  },

  async register(userData: any): Promise<AuthToken> {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const token: AuthToken = await response.json();
    localStorage.setItem(TOKEN_KEY, token.accessToken);
    localStorage.setItem(REFRESH_KEY, token.refreshToken);
    return token;
  },

  getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_KEY);
  },

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },

  getCurrentUser(): any | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};
