import React, {
  createContext, useContext, useEffect,
  useReducer, ReactNode,
} from 'react';
import { AuthContextValue, AuthState, LoginCredentials } from '@gadagi/types';
import { authService } from './authService';

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: AuthState['user'] }
  | { type: 'LOGIN_ERROR';   payload: string }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading:       false,
  user:            null,
  error:           null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':   return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS': return { ...state, isLoading: false, isAuthenticated: true, user: action.payload, error: null };
    case 'LOGIN_ERROR':   return { ...state, isLoading: false, error: action.payload };
    case 'LOGOUT':        return initialState;
    default:              return state;
  }
}

const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  login:        async () => {},
  logout:       () => {},
  refreshToken: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });
    try {
      await authService.login(credentials);
      const res  = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${authService.getAccessToken()}` },
      });
      const user = await res.json();
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (err) {
      dispatch({ type: 'LOGIN_ERROR', payload: (err as Error).message });
    }
  };

  const logout = (): void => {
    authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const refreshToken = async (): Promise<void> => {
    try {
      await authService.refreshToken();
    } catch {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => useContext(AuthContext);
