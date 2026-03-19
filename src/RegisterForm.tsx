import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, colors, spacing, typography } from '@gadagi/design-system';
import { authService } from './simpleAuthService';

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
        maxWidth: '500px',
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
            Create Account
          </h2>
          <p style={{
            fontSize: typography.fontSize.base,
            color: colors.neutral[600],
            marginBottom: spacing[6]
          }}>
            Join us today by creating your account
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
              First Name
            </label>
            <Input
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => setFormData((prev: UserData) => ({ ...prev, firstName: e.target.value }))}
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
              Last Name
            </label>
            <Input
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => setFormData((prev: UserData) => ({ ...prev, lastName: e.target.value }))}
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
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData((prev: UserData) => ({ ...prev, email: e.target.value }))}
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
              Mobile Number
            </label>
            <Input
              type="tel"
              placeholder="Enter your mobile number"
              value={formData.mobileNumber || ''}
              onChange={(e) => setFormData((prev: UserData) => ({ ...prev, mobileNumber: e.target.value }))}
              style={{ width: '100%', marginBottom: spacing[2] }}
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
              Date of Birth
            </label>
            <Input
              type="date"
              placeholder="Enter your date of birth"
              value={formData.dateOfBirth || ''}
              onChange={(e) => setFormData((prev: UserData) => ({ ...prev, dateOfBirth: e.target.value }))}
              style={{ width: '100%', marginBottom: spacing[4] }}
            />
          </div>

          {error && (
            <div style={{
              backgroundColor: colors.danger[100],
              color: colors.danger[500],
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
            {loading ? 'Creating Account...' : 'Create Account'}
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
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              style={{
                background: 'none',
                border: 'none',
                color: colors.primary[600],
                fontSize: typography.fontSize.sm,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
