"use client";

import { useTheme } from '@emotion/react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaidIcon from '@mui/icons-material/Paid';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setIsAuth, setUsername, setRole, setPermissions, setEmail, setError } from '@/store/authSlice/authSlice';
import { useRouter } from 'next/navigation';




const UserPageLayout = ({ children }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleLogOut = async () => {
    const response = await fetch('/api/auth/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (data.body.success) {
      dispatch(setIsAuth(false));
      dispatch(setUsername(''));
      dispatch(setRole(''));
      dispatch(setPermissions([]));
      dispatch(setEmail(''));
      dispatch(setError(''));
      router.push('/');
    }
  };
  const navLinks = [
    { title: 'Profile', path: '/profile', allowedRole: ["user", "shopper"], icons: <AccountCircleIcon /> },
    { title: 'Dashboard', path: '/dashboard', allowedRole: ["admin"], icons: <DashboardIcon /> },
    { title: 'Orders', path: '/orders', allowedRole: ["user", "shopper"], icons: <LocalShippingIcon /> },
    { title: 'Products', path: '/products', allowedRole: ["shopper"], icons: <StorefrontIcon /> },
    { title: 'Earning', path: '/earning', allowedRole: ["shopper"], icons: <PaidIcon /> },
    { title: 'Wishlist', path: '/wishlist', allowedRole: ["user"], icons: <BookmarkIcon /> },
  ];

  return (
    <>
      {!collapsed && <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9999,
      }}
        onClick={() => setCollapsed(true)}
      />}
      <Box sx={{
        position: 'fixed',
        zIndex: 10000,
        top: 0,
        left: 0,
        height: '100vh',
        width: collapsed ? '60px' : '240px', // Adjust width based on collapsed state
        backgroundColor: theme.palette.primary.main,
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'end',
        textAlign: 'center',
        transition: 'width 0.3s ease-in-out', // Add transition for smooth animation
      }}>
        <IconButton onClick={handleToggleCollapse}
          sx={{
            color: theme.palette.primary.contrastText,
            paddingRight: '20px',
            top: '10px',
            '&:hover': {
              backgroundColor: 'transparent',
              cursor: 'pointer',
            },
          }}>
          {collapsed ? <MenuIcon /> : <CloseIcon />} {/* Toggle menu icon */}
        </IconButton>
        <Box sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          gap: '10px',
          paddingTop: '20px',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'center',
          textAlign: 'center',
          paddingTop: '40px'
        }}>
          {navLinks.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              style={{
                padding: collapsed ? '10px' : '10px 0 10px 20px',
                color: theme.palette.primary.contrastText,
                backgroundColor: pathname === link.path ? theme.palette.primary.dark : 'transparent',
                gap: '10px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                width: '100%',
                textDecoration: 'none',
                display: 'flex',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                  cursor: 'pointer',
                },
              }}>
              {link.icons}
              <Typography variant='body1'>
                {collapsed ? null : link.title}
              </Typography>
            </Link>
          ))}
          <Button sx={{
            mt: 'auto',
            justifySelf: 'flex-end',
            padding: '10px',
            color: theme.palette.primary.contrastText,
            gap: '10px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            width: '100%',
            textDecoration: 'none',
            display: 'flex',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
              cursor: 'pointer',
            },
          }}>
            <LogoutIcon onClick={handleLogOut} />
            <Typography variant='body1'>
              {collapsed ? null : 'Logout'}
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box sx={{
        marginLeft: '100px', // Adjust margin based on collapsed state
        transition: 'margin-left 0.3s ease-in-out', // Add transition for smooth animation
      }}>
        {children}
      </Box>
    </>
  );
};

export default UserPageLayout
