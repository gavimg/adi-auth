import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@gadagi/design-system';
import { authService } from './simpleAuthService';
import './AuthForms.scss';

interface RegisterFormProps {
  onSuccess?: (user: any) => void;
  redirectTo?: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber?: string;
  dateOfBirth?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  redirectTo = '/dashboard'
}) => {
  const [formData, setFormData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    dateOfBirth: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.register(formData);
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
      <div className="auth-form__card auth-form__card--wide">
        <div className="auth-form__header">
          <h2 className="auth-form__title">Create Account</h2>
          <p className="auth-form__subtitle">Join us today by creating your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="auth-form__field">
            <label className="auth-form__label">First Name</label>
            <Input
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => setFormData((prev: UserData) => ({ ...prev, firstName: e.target.value }))}
              fullWidth
              required
            />
          </div>

          <div className="auth-form__field">
            <label className="auth-form__label">Last Name</label>
            <Input
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => setFormData((prev: UserData) => ({ ...prev, lastName: e.target.value }))}
              fullWidth
              required
            />
          </div>

          <div className="auth-form__field">
            <label className="auth-form__label">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData((prev: UserData) => ({ ...prev, email: e.target.value }))}
              fullWidth
              required
            />
          </div>

          <div className="auth-form__field">
            <label className="auth-form__label">Mobile Number</label>
            <Input
              type="tel"
              placeholder="Enter your mobile number"
              value={formData.mobileNumber || ''}
              onChange={(e) => setFormData((prev: UserData) => ({ ...prev, mobileNumber: e.target.value }))}
              fullWidth
            />
          </div>

          <div className="auth-form__field">
            <label className="auth-form__label">Date of Birth</label>
            <Input
              type="date"
              placeholder="Enter your date of birth"
              value={formData.dateOfBirth || ''}
              onChange={(e) => setFormData((prev: UserData) => ({ ...prev, dateOfBirth: e.target.value }))}
              fullWidth
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
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="auth-form__footer">
          <p className="auth-form__footer-text">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="auth-form__link"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
