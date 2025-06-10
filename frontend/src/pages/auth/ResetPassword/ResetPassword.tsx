import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import styles from './ResetPassword.module.css';
import { useAuth } from '../../../hooks/useAuth';

/**
 * ResetPassword component provides a form to reset a user's password.
 * It validates input, handles form submission, and shows success/error messages.
 */
const ResetPassword: React.FC = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  /**
   * Handles form submission for resetting the password.
   * Validates password match, calls the resetPassword API, and redirects on success.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate that both password fields match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await resetPassword(username, newPassword);
      setSuccess('Password reset successful. Redirecting to Sign In…');

      // Redirect to sign-in page after short delay
      setTimeout(() => navigate('/signin'), 2000);
    } catch (err: any) {
      // Display backend error message or fallback
      setError(err.response?.data?.detail || 'Reset failed.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <h2 className={styles.heading}>Reset your password</h2>

        {/* Password reset form */}
        <form onSubmit={handleSubmit}>
          {/* Username field */}
          <div className={styles.formGroup}>
            <label htmlFor="reset-username" className={styles.label}>Username</label>
            <input
              id="reset-username"
              type="text"
              className={styles.input}
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          {/* New password field */}
          <div className={styles.formGroup}>
            <label htmlFor="reset-password" className={styles.label}>New Password</label>
            <input
              id="reset-password"
              type="password"
              className={styles.input}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm new password field */}
          <div className={styles.formGroup}>
            <label htmlFor="reset-confirm-password" className={styles.label}>Confirm Password</label>
            <input
              id="reset-confirm-password"
              type="password"
              className={styles.input}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Display error or success message */}
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}

          {/* Submit button */}
          <button type="submit" className={styles.button}>Reset Password</button>
        </form>

        {/* Footer link to sign-in page */}
        <div className={styles.footer}>
          <Link to="/signin">Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
