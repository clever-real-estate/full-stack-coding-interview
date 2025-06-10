import React from 'react';
import { Box, Typography, Avatar, Link, Stack, Paper } from '@mui/material';
import StarIcon from './StarIcon';
import { Photo } from '../types';
import LinkIcon from '@mui/icons-material/Link';

interface PhotoListItemProps {
  photo: Photo;
  onLike: (photoId: number) => void;
}

const getInitials = (name: string) => {
  if (!name) return '';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const PhotoListItem: React.FC<PhotoListItemProps> = ({ photo, onLike }) => {
  return (
    <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center', mb: 3, p: 2, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <Box mr={2} display="flex" flexDirection="column" alignItems="center">
        <Box onClick={() => onLike(photo.id)} sx={{ cursor: 'pointer', mb: 0.5 }}>
          <StarIcon filled={photo.hasLiked} size={28} />
        </Box>
        <Avatar sx={{ bgcolor: '#A259FF', width: 32, height: 32, fontWeight: 700, fontSize: 18, mt: 1 }}>
          {getInitials(photo.photographer || 'J')}
        </Avatar>
      </Box>
      <Box mr={2}>
        <img
          src={photo.image_url}
          alt={photo.title}
          style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover', background: '#eee' }}
        />
      </Box>
      <Box flex={1} minWidth={0}>
        <Typography fontWeight={700} fontSize={17} noWrap>
          {photo.photographer || 'photo.photographer'}
        </Typography>
        <Typography fontSize={15} color="text.secondary" noWrap>
          {photo.title || 'photo.alt'}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
          <Typography fontSize={14} color="text.secondary">
            {photo.color || '#374824'}
          </Typography>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: '4px',
              background: photo.color || '#374824',
              border: '1px solid #ccc',
            }}
          />
        </Stack>
      </Box>
      <Box ml={2} display="flex" flexDirection="column" alignItems="flex-end">
        <Link href={photo.photographer_url || '#'} target="_blank" rel="noopener" underline="hover" sx={{ display: 'flex', alignItems: 'center', color: '#0074F0', fontWeight: 500, fontSize: 15 }}>
          <LinkIcon sx={{ fontSize: 18, mr: 0.5 }} /> Portfolio
        </Link>
      </Box>
    </Paper>
  );
};

export default PhotoListItem; 