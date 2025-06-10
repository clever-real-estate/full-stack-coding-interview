import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  InputLabel,
  Stack,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/Logo';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/photos');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Box width="100%">
        <Paper
          elevation={0}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 3,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <Logo size={72} />
          <Typography component="h1" variant="h5" fontWeight={700} align="center" mt={1} mb={3}>
            Sign in to your account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <Stack spacing={2}>
              <Box>
                <InputLabel htmlFor="email" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Username
                </InputLabel>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  size="medium"
                  sx={{ mt: 0.5 }}
                />
              </Box>
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <InputLabel htmlFor="password" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Password
                  </InputLabel>
                  <Link href="#" variant="body2" sx={{ fontWeight: 400 }}>
                    Forgot password?
                  </Link>
                </Box>
                <TextField
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  size="medium"
                  sx={{ mt: 0.5 }}
                />
              </Box>
              {error && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1, fontWeight: 700, fontSize: 18, background: '#0074F0', borderRadius: 2, py: 1.2 }}
              >
                Sign in
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 