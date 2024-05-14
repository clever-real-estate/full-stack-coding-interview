import React, { useEffect, useState } from 'react';
import './Photos.css';
import starLine from './star-line.svg';
import starFill from './star-fill.svg';
import links from './links.svg';
import client from '../apiClient';
import Cookies from 'js-cookie';

client.interceptors.request.use(function(config) {
    const token = Cookies.get('csrftoken');
    config.headers['X-CSRFToken'] = token;
    return config;
});

const PhotoCard = React.memo(({ photo, onToggleLike }) => (
    <div key={photo.id} className="photo-card">
        <a href="">
            <div className="photo-star">
                <img
                    src={photo.liked_by_user ? starFill : starLine}
                    onClick={() => onToggleLike(photo.id)}
                    alt="star icon"
                />
            </div>
        </a>
        <img src={photo.tiny_url} alt={photo.description} className="photo-image"/>
        <div className="photo-info">
            <strong>{photo.photographer.name} - </strong>
            <a href={photo.photographer.portfolio} target="_blank" rel="noopener noreferrer">
                <img src={links} alt="link-svg" className="link-svg"></img>Portfolio
            </a>
            <p>{photo.description}</p>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <p style={{marginRight: '10px'}}>{photo.avg_color}</p>
                <div className="photo-color" style={{backgroundColor: photo.avg_color}}></div>
            </div>
        </div>
    </div>
));

function Photos() {
  const [photos, setPhotos] = useState([]);
  const toggleLike = async (id) => {
      try {
          const response = await client.post(`/photos/${id}/like/`, { withCredentials: true });
          if (response.status === 200) {
              setPhotos(currentPhotos => currentPhotos.map(photo => {
                  if (photo.id === id) {
                      return { ...photo, liked_by_user: !photo.liked_by_user };
                  }
                  return photo;
              }));
          } else {
              console.error('Failed to like the photo');
          }
      } catch (error) {
          console.error('Error liking the photo:', error);
          if (error.response) {
              console.error('Error details:', error.response.data);
          }
      }
  };

  useEffect(() => {
      client.get('/photos', { withCredentials: true })
          .then(response => {
              setPhotos(response.data);
          })
          .catch(error => {
              console.error('Error fetching data', error);
          });
  }, []);

  return (
      <div className="photo-container">
          {photos.map(photo => (
              <PhotoCard key={photo.id} photo={photo} onToggleLike={toggleLike} />
          ))}
      </div>
  );
}

export default Photos;
