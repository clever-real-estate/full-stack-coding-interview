import React from 'react';
import logo from '../logo.svg';
import LoginForm from '../components/molecules/LoginForm';
import styles from '../styles/LoginPage.module.css';

const LoginPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h2 className={styles.title}>Sign in to your account</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage; 