import React from 'react';
import { useAuth } from '../hooks/useAuth';
import logo from '../logo.svg';
import PhotoList from '../components/organisms/PhotoList';
import styles from '../styles/PhotosPage.module.css';

const PhotosPage: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h1 className={styles.title}>All photos</h1>
        <div className={styles.userInfo}>
          <span>Welcome, {user?.username}!</span>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </header>
      <PhotoList />
    </div>
  );
};

export default PhotosPage; 