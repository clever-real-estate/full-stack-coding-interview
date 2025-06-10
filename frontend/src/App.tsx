import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useAuth } from './hooks/useAuth';

/**
 * Root component of the application.
 * Wraps routing logic with React Router and renders route-based views.
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
