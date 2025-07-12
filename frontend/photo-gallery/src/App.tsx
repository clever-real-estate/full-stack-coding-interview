import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import PhotosPage from './pages/PhotosPage';
import PrivateRoute from './components/atoms/PrivateRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
    <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/photos" 
              element={
                <PrivateRoute>
                  <PhotosPage />
                </PrivateRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/photos" replace />} />
          </Routes>
    </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
