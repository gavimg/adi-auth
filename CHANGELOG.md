# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2026-03-18

### Added
- **LoginForm Component**: Standalone login form with email/password fields
- **RegisterForm Component**: Standalone registration form with user data fields
- **simpleAuthService**: Lightweight authentication service for JWT backend
- **Cross-app data storage**: localStorage integration for user data accessibility
- **Design system integration**: Uses @gadagi/design-system components (Button, Input)
- **Responsive design**: Mobile-friendly layouts with proper spacing and typography

### Features
- **LoginForm**: Import as `import { LoginForm } from '@gadagi/auth'`
  - Email and password fields with validation
  - JWT token authentication
  - Error handling and loading states
  - Navigation between login/signup
  - Usage: `<Route path="/login" element={<LoginForm />} />`

- **RegisterForm**: Import as `import { RegisterForm } from '@gadagi/auth'`
  - Complete user registration (firstName, lastName, email, mobile, dateOfBirth)
  - Form validation and error handling
  - JWT backend integration
  - Usage: `<Route path="/signup" element={<RegisterForm />} />`

### Technical Details
- **Backend Compatibility**: JWT authentication with REST API endpoints
- **SSO Support**: Ready for Gmail, Hotmail, and other email providers
- **Data Storage**: localStorage for cross-app user data accessibility
- **Plug-and-Play**: No wrapper components required - direct route binding

## [1.0.1] - 2026-03-18

### Added
- Initial authentication utilities
- AuthProvider with context management
- ProtectedRoute component
- Basic authService
- TypeScript type definitions

### Features
- Authentication context for React applications
- Protected route wrapper for authenticated routes
- Token management and refresh logic
