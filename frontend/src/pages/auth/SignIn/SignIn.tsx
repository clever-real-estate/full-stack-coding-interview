// frontend/src/routes/SignIn.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import styles from './SignIn.module.css';
import { ReactComponent as Logo } from '../../../assets/logo.svg';

/**
 * SignIn component handles user authentication input and submission.
 * It uses the auth context to perform login and navigates on success.
 */
const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // State to track form inputs and possible error
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles form submission for login.
   * If successful, redirects user to the /photos route.
   * If login fails, displays an error message.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(username, password);
      navigate('/photos');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Logo display */}
        <div className={styles.logo}>
          <Logo />
        </div>

        <h2 className={styles.heading}>Sign in to your account</h2>

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          {/* Username field */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className={styles.input}
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password field with forgot link */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <Link to="/reset-password" className={styles.forgotLink}>
              Forgot password?
            </Link>
            <input
              id="password"
              className={styles.input}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Show error if login fails */}
          {error && <p className={styles.error}>{error}</p>}

          {/* Submit button */}
          <button type="submit" className={styles.button}>
            Sign in
          </button>
        </form>

        {/* Footer link to registration page */}
        <div className={styles.footer}>
          Don’t have an account?{' '}
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
