import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import styles from './SignUp.module.css';
import { ReactComponent as Logo } from '../../../assets/logo.svg';

/**
 * SignUp component provides a user registration form.
 * Validates input and registers a new user through the auth context.
 */
const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  // Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles the registration form submission.
   * Validates passwords and calls the register API.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Password match validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(username, password);
      navigate('/photos'); // Redirect after successful registration
    } catch (err: any) {
      // Show appropriate error message
      const errorMessage =
        err.response?.data?.detail || // Backend message
        err.message ||                // Network error
        'Registration failed';        // Fallback message
      setError(errorMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Logo section */}
        <div className={styles.logo}>
          <Logo />
        </div>

        <h2 className={styles.heading}>Create your account</h2>

        {/* Registration form */}
        <form onSubmit={handleSubmit}>
          {/* Username input */}
          <div className={styles.formGroup}>
            <label htmlFor="signup-username" className={styles.label}>
              Username
            </label>
            <input
              id="signup-username"
              className={styles.input}
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password input */}
          <div className={styles.formGroup}>
            <label htmlFor="signup-password" className={styles.label}>
              Password
            </label>
            <input
              id="signup-password"
              className={styles.input}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm password input */}
          <div className={styles.formGroup}>
            <label htmlFor="signup-confirm-password" className={styles.label}>
              Confirm Password
            </label>
            <input
              id="signup-confirm-password"
              className={styles.input}
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Error display */}
          {error && <p className={styles.error}>{error}</p>}

          {/* Submit button */}
          <button type="submit" className={styles.button}>
            Sign up
          </button>
        </form>

        {/* Footer with link to sign-in page */}
        <div className={styles.footer}>
          Already have an account? <Link to="/signin">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
