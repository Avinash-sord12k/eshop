import React from 'react'
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Empty = () => {
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
      <ShoppingCartIcon sx={{ fontSize: 64, color: '#888' }} />
      <Typography variant="h6" align="center" mt={2} color="textSecondary">
        Page Not Found
      </Typography>
      <Typography variant="body1" align="center" mt={2} color="textSecondary">
        The page you are looking for does not exist.
      </Typography>
      <Link href="/">
        <Button variant="contained" color="primary" sx={{ marginTop: '16px' }}>
          Go to Home
        </Button>
      </Link>
    </Box>
  );
};

export default Empty;