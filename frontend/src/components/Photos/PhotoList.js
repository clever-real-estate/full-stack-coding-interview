import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, CardActions, Typography, IconButton, Container } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import axios from 'axios';

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
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        {photos.map((photo) => (
          <Grid item key={photo.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                sx={{ height: 200, objectFit: 'cover' }}
                image={photo.src_medium}
                alt={photo.alt}
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  By {photo.photographer}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleLike(photo.id)}>
                  {photo.likes > 0 ? <Favorite color="error" /> : <FavoriteBorder />}
                </IconButton>
                <Typography>{photo.likes || 0} likes</Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PhotoList;
