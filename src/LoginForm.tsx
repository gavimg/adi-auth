import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, colors, spacing, typography } from '@gadagi/design-system';
import { authService } from './simpleAuthService';

interface LoginFormProps {
  onSuccess?: (user: any) => void;
  redirectTo?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess, 
  redirectTo = '/dashboard' 
}) => {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login(formData);
      const user = authService.getCurrentUser();
      
      onSuccess?.(user);
      navigate(redirectTo);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.neutral[50],
      padding: spacing[6]
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: spacing[8],
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: spacing[6]
        }}>
          <h2 style={{
            fontSize: typography.fontSize['2xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.neutral[800],
            marginBottom: spacing[4]
          }}>
            Welcome Back
          </h2>
          <p style={{
            fontSize: typography.fontSize.base,
            color: colors.neutral[600],
            marginBottom: spacing[6]
          }}>
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: spacing[4] }}>
            <label style={{
              display: 'block',
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.medium,
              color: colors.neutral[800],
              marginBottom: spacing[2]
            }}>
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              style={{ width: '100%', marginBottom: spacing[2] }}
              required
            />
          </div>

          <div style={{ marginBottom: spacing[4] }}>
            <label style={{
              display: 'block',
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.medium,
              color: colors.neutral[800],
              marginBottom: spacing[2]
            }}>
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              style={{ width: '100%', marginBottom: spacing[4] }}
              required
            />
          </div>

          {error && (
            <div style={{
              backgroundColor: '#fef2f2',
              color: '#991b1b',
              padding: spacing[3],
              borderRadius: '6px',
              fontSize: typography.fontSize.sm,
              marginBottom: spacing[4]
            }}>
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={loading}
            style={{ marginTop: spacing[4] }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: spacing[6]
        }}>
          <p style={{
            fontSize: typography.fontSize.sm,
            color: colors.neutral[600]
          }}>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              style={{
                background: 'none',
                border: 'none',
                color: colors.primary[600],
                fontSize: typography.fontSize.sm,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
