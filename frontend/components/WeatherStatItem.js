'use client';

import React from 'react';

import { 
  Typography, 
  Box, 
  
} from '@mui/material';



const WeatherStatItem = ({ label, value }) => (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="body2" fontWeight="medium">
        {label}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {value}
      </Typography>
    </Box>
  );


  export default WeatherStatItem;