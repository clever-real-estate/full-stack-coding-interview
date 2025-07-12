jest.mock('../../../utils/authService', () => {
  const mockLogin = jest.fn();
  return {
    authService: {
      login: mockLogin,
      logout: jest.fn(),
      getCurrentUser: jest.fn(),
    },
    __esModule: true,
    mockLogin,
  };
});

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { AuthProvider } from '../../../hooks/useAuth';
import LoginForm from '../LoginForm';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('LoginForm', () => {
  let mockLogin: jest.Mock;
  beforeEach(() => {
    mockLogin = require('../../../utils/authService').mockLogin;
    mockLogin.mockClear();
    mockNavigate.mockClear();
  });

  const renderWithAuth = (component: React.ReactElement) => {
    return render(
      <AuthProvider>
        {component}
      </AuthProvider>
    );
  };

  it('renders login form with all fields', async () => {
    await act(async () => {
      renderWithAuth(<LoginForm />);
    });
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('submits form with username and password', async () => {
    mockLogin.mockResolvedValue({ id: 1, username: 'testuser' });
    await act(async () => {
      renderWithAuth(<LoginForm />);
    });
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('testuser', 'password123');
    });
  });

  it('shows error message when login fails', async () => {
    mockLogin.mockRejectedValue(new Error('Invalid credentials'));
    await act(async () => {
      renderWithAuth(<LoginForm />);
    });
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('shows loading state when form is submitted', async () => {
    mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    await act(async () => {
      renderWithAuth(<LoginForm />);
    });
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
    });
    expect(screen.getByText(/signing in/i)).toBeInTheDocument();
  });

  it('requires username and password fields', async () => {
    await act(async () => {
      renderWithAuth(<LoginForm />);
    });
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(usernameInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });
}); 