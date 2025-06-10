import React from 'react';
import Box from '@mui/material/Box';

const Logo: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <Box display="flex" justifyContent="center" alignItems="center" my={2}>
    <img
      src={require('../logo.svg').default}
      alt="Clever Logo"
      width={size}
      height={size}
      style={{ display: 'block' }}
    />
  </Box>
);

export default Logo; 