import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import PhotoList from './components/Photos/PhotoList';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Photo Gallery</Typography>
        </Toolbar>
      </AppBar>
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
