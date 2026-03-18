# @gadagi/auth - Authentication Library

Authentication utilities and React context for the Gadagi platform micro-frontend architecture.

## Overview

This package provides authentication functionality including login, logout, token management, and user session handling across all Gadagi micro-frontends.

## Installation

```bash
npm install @gadagi/auth
```

## Peer Dependencies

```bash
npm install react react-dom react-router-dom @gadagi/types
```

## Features

- 🔐 **Authentication Context** - Global auth state management
- 🔄 **Token Management** - Automatic token refresh and storage
- 🛡️ **Route Protection** - Auth guards and protected routes
- 📱 **Session Management** - Persistent user sessions
- 🎯 **Type Safety** - Full TypeScript support

## Quick Start

```tsx
import { AuthProvider, useAuth, ProtectedRoute } from '@gadagi/auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function DashboardPage() {
  const { user, logout } = useAuth();
  
  return (
    <div>
      <h1>Welcome, {user?.firstName}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## Components

### AuthProvider

The root provider that wraps your application and manages authentication state.

```tsx
import { AuthProvider } from '@gadagi/auth';

function App() {
  return (
    <AuthProvider>
      <YourApp />
    </AuthProvider>
  );
}
```

**Props:**
- `children: ReactNode` - Your application components

### ProtectedRoute

A route wrapper that requires authentication to access.

```tsx
import { ProtectedRoute } from '@gadagi/auth';

<Route path="/dashboard" element={
  <ProtectedRoute fallback="/login">
    <Dashboard />
  </ProtectedRoute>
} />
```

**Props:**
- `children: ReactNode` - Protected content
- `fallback?: string` - Redirect path for unauthenticated users (default: "/login")

## Hooks

### useAuth

Access authentication state and actions.

```tsx
import { useAuth } from '@gadagi/auth';

function UserProfile() {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    error, 
    login, 
    logout 
  } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please login</div>;

  return (
    <div>
      <h1>{user?.firstName} {user?.lastName}</h1>
      <p>{user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

**Returns:**
- `user: User | null` - Current user data
- `isAuthenticated: boolean` - Authentication status
- `isLoading: boolean` - Loading state
- `error: string | null` - Error message
- `login: (credentials: LoginCredentials) => Promise<void>` - Login function
- `logout: () => void` - Logout function

## Authentication Service

### authService

Low-level authentication service for direct API calls.

```tsx
import { authService } from '@gadagi/auth';

// Login
try {
  const response = await authService.login({
    email: 'user@example.com',
    password: 'password123'
  });
  console.log('Logged in:', response.user);
} catch (error) {
  console.error('Login failed:', error);
}

// Logout
await authService.logout();

// Get current user
const currentUser = await authService.getCurrentUser();

// Check authentication status
const isAuth = await authService.isAuthenticated();
```

### Methods

- `login(credentials: LoginCredentials): Promise<AuthResponse>`
- `logout(): Promise<void>`
- `getCurrentUser(): Promise<User | null>`
- `isAuthenticated(): Promise<boolean>`
- `refreshToken(): Promise<string>`

## Token Management

The library automatically handles JWT tokens:

- **Storage**: Tokens are stored in localStorage
- **Refresh**: Automatic token refresh before expiration
- **Cleanup**: Tokens are removed on logout
- **Headers**: Authorization headers are automatically added to API requests

## Route Protection

### Protecting Routes

```tsx
import { ProtectedRoute } from '@gadagi/auth';

// Single route protection
<Route path="/settings" element={
  <ProtectedRoute>
    <SettingsPage />
  </ProtectedRoute>
} />

// With custom fallback
<Route path="/admin" element={
  <ProtectedRoute fallback="/unauthorized">
    <AdminPanel />
  </ProtectedRoute>
} />
```

### Programmatic Navigation

```tsx
import { useAuth } from '@gadagi/auth';

function LoginButton() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return <button onClick={handleClick}>
    {isAuthenticated ? 'Dashboard' : 'Login'}
  </button>;
}
```

## Error Handling

```tsx
import { useAuth } from '@gadagi/auth';

function LoginForm() {
  const { login, error, isLoading } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(credentials);
      // Login successful - navigation handled by AuthProvider
    } catch (err) {
      // Error is automatically set in the auth state
      console.error('Login error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {/* Form fields */}
    </form>
  );
}
```

## TypeScript Support

Full TypeScript support with proper type definitions:

```tsx
import { AuthState, LoginCredentials } from '@gadagi/types';
import { useAuth } from '@gadagi/auth';

// Type-safe hook usage
const { user, isAuthenticated }: AuthState = useAuth();

// Type-safe credentials
const credentials: LoginCredentials = {
  email: 'user@example.com',
  password: 'password123'
};
```

## Security Features

- **Token Storage**: Secure localStorage with encryption options
- **CSRF Protection**: Built-in CSRF token handling
- **Session Expiration**: Automatic logout on token expiration
- **Route Guards**: Client-side route protection
- **Input Validation**: Credential validation before API calls

## Development

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT © Gadagi Team
