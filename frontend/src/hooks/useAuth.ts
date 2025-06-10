import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom hook to access authentication context.
 * Simplifies consumption of AuthContext throughout the app.
 *
 * @returns AuthContext values (token, login, logout, register, resetPassword)
 */
export const useAuth = () => useContext(AuthContext);
