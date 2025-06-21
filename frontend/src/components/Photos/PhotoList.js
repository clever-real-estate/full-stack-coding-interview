import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, IconButton, Container, Link } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import axios from 'axios';
import logo from '../../logo.svg';

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/photos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPhotos(response.data);
      } catch (err) {
        console.error('Error fetching photos:', err);
      }
    };

    fetchPhotos();
  }, []);

  const handleLike = async (photoId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:3001/api/photos/${photoId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update photos state to reflect the new like status
      setPhotos(photos.map(photo => 
        photo.id === photoId 
          ? { ...photo, likes: photo.likes + 1 } 
          : photo
      ));
    } catch (err) {
      console.error('Error liking photo:', err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <img src={logo} alt="CI Logo" style={{ width: '64px', height: '64px' }} />
      </Box>
      
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>All photos</Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {photos.map((photo) => (
          <Card 
            key={photo.id} 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              p: 2,
              borderRadius: 2,
              boxShadow: 'none',
              border: '1px solid #E5E7EB'
            }}
          >
            <IconButton 
              onClick={() => handleLike(photo.id)}
              sx={{ mr: 2 }}
            >
              {photo.likes > 0 ? 
                <Star sx={{ color: '#FDB022' }} /> : 
                <StarBorder sx={{ color: '#667085' }} />
              }
            </IconButton>

            <Box sx={{ 
              width: 48, 
              height: 48, 
              borderRadius: 1,
              overflow: 'hidden',
              mr: 2
            }}>
              <img 
                src={photo.src_medium} 
                alt={photo.alt}
                style={{ 
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {photo.photographer}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {photo.alt}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                <Typography 
                  variant="body2" 
                  sx={{ color: '#344054' }}
                >
                  {photo.avg_color}
                </Typography>
                <Box 
                  sx={{ 
                    width: 16, 
                    height: 16, 
                    bgcolor: photo.avg_color || '#E5E7EB',
                    borderRadius: 0.5,
                    ml: 1
                  }} 
                />
              </Box>
            </Box>

            <Link 
              href={photo.photographer_url} 
              target="_blank"
              sx={{ 
                color: '#0066FF',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Portfolio
            </Link>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PhotoList;
