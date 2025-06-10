import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Button,
} from '@mui/material';
import { Photo } from '../types';
import { photos } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/Logo';
import PhotoListItem from '../components/PhotoListItem';

const Photos: React.FC = () => {
  const [photoList, setPhotoList] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    const fetchPhotos = async () => {
      try {
        const data = await photos.getAll();
        setPhotoList(data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [isAuthenticated, navigate]);

  const handleLike = async (photoId: number) => {
    try {
      const { hasLiked, likes } = await photos.toggleLike(photoId);
      setPhotoList((prevPhotos) =>
        prevPhotos.map((photo) =>
          photo.id === photoId
            ? { ...photo, hasLiked, likes }
            : photo
        )
      );
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', background: '#fafbfc' }}>
      <Container maxWidth="xs" sx={{ pt: 4, pb: 4 }}>
        <Logo size={72} />
        <Typography variant="h5" fontWeight={700} mb={3} mt={1}>
          All photos
        </Typography>
        {photoList.map((photo) => (
          <PhotoListItem key={photo.id} photo={photo} onLike={handleLike} />
        ))}
        <Box mt={4} textAlign="center">
          <Button color="inherit" onClick={handleLogout} sx={{ fontWeight: 500 }}>
            Logout
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Photos; 