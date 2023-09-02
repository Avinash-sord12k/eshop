import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NotAuthorized = () => {
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
      <Typography variant="h6" align="center" color="textSecondary">
        Not Authorized
      </Typography>
      <Typography variant="body1" align="center" mt={2} color="textSecondary">
        You don&apos;t have permission to access this page.
      </Typography>
      <Link href="/">
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: '16px' }}
          startIcon={<ArrowBackIcon />}
        >
          Go Back
        </Button>
      </Link>
    </Box>
  );
};

export default NotAuthorized;
