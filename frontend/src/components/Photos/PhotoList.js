import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, IconButton, Container, Link } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import axios from 'axios';
import logo from '../../logo.svg';
import links from '../../links.svg';

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
      const photo = photos.find(p => p.id === photoId);
      const isLiked = photo.likes > 0;
      
      if (isLiked) {
        await axios.delete(`http://localhost:3001/api/photos/${photoId}/like`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`http://localhost:3001/api/photos/${photoId}/like`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      // Update photos state to reflect the new like status
      setPhotos(photos.map(photo => 
        photo.id === photoId 
          ? { ...photo, likes: isLiked ? 0 : 1 } 
          : photo
      ));
    } catch (err) {
      console.error('Error liking photo:', err);
    }
  };

  return (
    <Box sx={{ px: 3, py: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <img src={logo} alt="CI Logo" style={{ width: '64px', height: '64px' }} />
      </Box>
      
      <Typography sx={{ 
        mb: 4,
        fontFamily: 'Helvetica',
        fontWeight: 700,
        fontSize: '20px',
        lineHeight: 1,
        letterSpacing: '0%'
      }}>All photos</Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {photos.map((photo) => (
          <Box
            key={photo.id} 
            sx={{ 
              display: 'flex',
              minHeight: 80,
              py: 2,
              alignItems: 'flex-start'
            }}
          >
            <IconButton 
              onClick={() => handleLike(photo.id)}
              sx={{ mr: 2, px: 0 }}
            >
              {photo.likes > 0 ? 
                <Star sx={{ color: '#FDB022' }} /> : 
                <StarBorder sx={{ color: '#667085' }} />
              }
            </IconButton>

            <Box sx={{ 
              width: 75, 
              height: 75,
              borderRadius: 1,
              overflow: 'hidden',
              mr: 2,
              position: 'relative'
            }}>
              <img 
                src={photo.src_medium} 
                alt={photo.alt}
                style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography sx={{ 
                fontFamily: 'Helvetica',
                fontWeight: 700,
                fontSize: '14px',
                lineHeight: 1,
                letterSpacing: '0%',
                mb: 1
              }}>
                {photo.photographer}
              </Typography>
              <Typography sx={{ 
                fontFamily: 'Helvetica',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: 1,
                letterSpacing: '0%',
                mb: 1
              }}>
                {photo.alt}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography 
                  sx={{ 
                    fontFamily: 'Helvetica',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: 1,
                    letterSpacing: '0%',
                    color: '#344054'
                  }}
                >
                  {photo.avg_color}
                </Typography>
                <Box 
                  sx={{ 
                    width: 12, 
                    height: 12, 
                    bgcolor: photo.avg_color || '#E5E7EB',
                    borderRadius: 0.5,
                    ml: 1
                  }} 
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img src={links} alt="Links icon" style={{ width: '12px', height: '12px' }} />
              <Link 
                href={photo.photographer_url} 
                target="_blank"
                sx={{ 
                  color: '#0066FF',
                  textDecoration: 'none',
                  fontFamily: 'Helvetica',
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: '0%',
                  textAlign: 'right',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Portfolio
              </Link>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PhotoList;
