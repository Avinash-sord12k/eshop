"use client"
import React, { useState } from 'react'
import { Box, Typography, IconButton, Button, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '@/store/authSlice/authSlice';
import LogoutIcon from '@mui/icons-material/Logout';



const SideBar = ({ navLinks }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);
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
      dispatch(setLogout());
      // router.push('/');
      window.location.href = '/';
    }
  };


  return (
    <>
      {!collapsed &&
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 9999,
        }}
          onClick={() => setCollapsed(true)}
        />}
      <IconButton onClick={handleToggleCollapse}
        sx={{
          position: 'fixed',
          top: '8px',
          left: '8px',
          color: theme.palette.primary.contrastText,
          width: '40px',
          height: '40px',
          backgroundColor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {collapsed ? <MenuIcon /> : <CloseIcon />}
      </IconButton>
      <Box sx={{
        position: 'fixed',
        zIndex: 10000,
        top: 0,
        left: 0,
        height: '100vh',
        width: collapsed ? '60px' : '240px',
        backgroundColor: theme.palette.primary.main,
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'end',
        textAlign: 'center',
        transition: 'width 0.3s ease-in-out',
        '@media (max-width: 600px)': {
          transform: collapsed ? 'translateX(-100%)' : 'translateX(0%)',
        },
      }}>
        <IconButton onClick={handleToggleCollapse}
          sx={{
            color: theme.palette.primary.contrastText,
            paddingRight: '20px',
            backgroundColor: 'primary.main',
            top: '10px',
          }}>
          {collapsed ? <MenuIcon /> : <CloseIcon />}
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
    </>
  )
}

export default SideBar
