import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@gadagi/design-system';
import { authService } from './simpleAuthService';
import './AuthForms.css';

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
    <div className="auth-form">
      <div className="auth-form__card">
        <div className="auth-form__header">
          <h2 className="auth-form__title">Welcome Back</h2>
          <p className="auth-form__subtitle">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="auth-form__field">
            <label className="auth-form__label">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              fullWidth
              required
            />
          </div>

          <div className="auth-form__field">
            <label className="auth-form__label">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              fullWidth
              required
            />
          </div>

          {error && (
            <div className="auth-form__error">{error}</div>
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={loading}
            className="auth-form__submit"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="auth-form__footer">
          <p className="auth-form__footer-text">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="auth-form__link"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
