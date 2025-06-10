import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './index.css'; // Global styles
import reportWebVitals from './reportWebVitals';

// Create the root of the React application and mount it to the DOM
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render the app inside React's StrictMode and provide authentication context globally
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// Optional: Measure app performance and report it to analytics or console
// Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
