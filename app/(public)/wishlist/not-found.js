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
        Your Wishlist is empty
      </Typography>
      <Typography variant="body1" align="center" mt={2} color="textSecondary">
        It looks like you haven&apos;t added any items to your wishlist yet.
      </Typography>
      <Link href="/">
        <Button variant="contained" color="primary" sx={{ marginTop: '16px' }}>
          Start Shopping
        </Button>
      </Link>
    </Box>
  );
};

export default Empty;