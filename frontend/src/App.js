import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import PhotoList from './components/Photos/PhotoList';
import { Container } from '@mui/material';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/photos"
            element={
              <PrivateRoute>
                <PhotoList />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/photos" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
