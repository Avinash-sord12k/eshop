import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, LinearProgress } from '@mui/material';

const Loading = () => {
  return (
    <>
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
      }}>
        <LinearProgress color="secondary" />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="secondary" />
      </Box>
    </>
  );
}

export default Loading;
