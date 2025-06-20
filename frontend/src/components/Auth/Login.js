import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import axios from 'axios';
import logo from '../../logo.svg';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      navigate('/photos');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={logo} alt="CI Logo" style={{ width: '64px', height: '64px', marginBottom: '24px' }} />
        <Typography component="h1" variant="h4" sx={{ mb: 4 }}>Sign in to your account</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: '400px' }}>
          <Typography sx={{ mb: 1 }}>Username</Typography>
          <TextField
            required
            fullWidth
            placeholder="testing@testing.com"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            sx={{ mb: 3 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography>Password</Typography>
            <Link href="#" underline="none" sx={{ color: '#0066FF' }}>Forgot password?</Link>
          </Box>
          <TextField
            required
            fullWidth
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 2,
              mb: 2,
              bgcolor: '#0066FF',
              '&:hover': { bgcolor: '#0052CC' },
              height: '48px',
              borderRadius: '6px',
              textTransform: 'none',
              fontSize: '16px'
            }}
          >
            Sign in
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
