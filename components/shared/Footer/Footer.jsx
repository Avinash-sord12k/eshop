import React from 'react';
import { Typography, Container, Box, Divider } from '@mui/material';
import Link from 'next/link';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box color='primary.contrastText' mt={10}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        ['@media (max-width: 600px)']: {
          flexDirection: 'column',
          gap: '1rem',
        },
        backgroundColor: 'primary.main',
        padding: '1rem',
      }}>
        <Box sx={{
          display: 'flex',
          gap: '1rem',
          flex: '1 1 0',
          '& a': {
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': {
              textDecoration: 'underline',
            }
          }
        }}>
          <Link href="/" color="inherit" >
            Home
          </Link>
          <Link href="/" color="inherit">
            Products
          </Link>
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          color: 'inherit',
          flex: '1 1 0',
        }}>
          <ShoppingBagIcon />
          <Typography variant="h6" color="inherit">
            eSHOP
          </Typography>
        </Box>
        <Divider flexItem color="#eee" />
        <Typography color="inherit" sx={{ flex: '1 1 0', whiteSpace: 'nowrap', justifySelf: 'flex-end', textAlign: 'right'}}>
          &copy; {currentYear} E Shop. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
