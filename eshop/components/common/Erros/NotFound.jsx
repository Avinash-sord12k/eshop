import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = () => {
  return (
    <Box
      sx={{
        borderRadius: '4px',
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        backgroundColor: '#f5f5f5',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 64, color: '#888' }} />
      <Typography variant="h6" align="center" mt={2} color="textSecondary">
        Nothing's here
      </Typography>
      <Link href="/">
        <Button variant="contained" color="primary" sx={{ marginTop: '16px' }}>
          Go to home
        </Button>
      </Link>
    </Box>
  );
};

export default NotFound;
