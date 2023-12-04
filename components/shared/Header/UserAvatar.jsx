"use client";
import { Badge, IconButton, Tooltip, Avatar, Menu, MenuItem, Typography, Box, Button } from '@mui/material';
import React from 'react'
import { stringToColor } from '@/utils/extras/extras';
import LogoutBtn from './LogoutBtn';
import Link from 'next/link';


const UserAvatar = ({ props }) => {
  const { username, roleName: role, image, isAuth } = props;
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const settings = [
    {
      title: 'Profile',
      description: 'Manage and personalize your profile information.',
      href: `/${role}/profile`,
      permissions: [],
    },
    // {
    //   title: 'Dashboard',
    //   description: 'Access your administrative dashboard.',
    //   href: `/${role}/dashboard`,
    //   permissions: [],
    // },
    {
      title: 'Wishlist',
      description: 'Manage your wishlist.',
      href: `/wishlist`,
      permissions: [],
      authReq: true,
    },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0].toUpperCase()}`,
    };
  }

  return (
    <Box>
      {isAuth ?
        <>
          <Tooltip title="Open settings">
            <Badge color={'secondary'}
              badgeContent={stringAvatar(role).children}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {
                  image
                    ? <Avatar alt="user image" src={image} />
                    : <Avatar {...stringAvatar(username)} />
                }
              </IconButton>
            </Badge>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <Link href={setting.href} key={setting.title} style={{
                textDecoration: 'none',
                color: 'inherit',
              }}>
                <MenuItem >
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              </Link>
            ))}
            <LogoutBtn />
          </Menu>
        </>
        : <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          '& > *': {
            color: 'white',
          },
        }}>
          <Link
            href="/auth/signin"
          >
            <Button
              variant="contained"
              disableElevation
              >
              Login
            </Button>
          </Link>
          <Link
            href="/auth/signup"
            >
            <Button
              variant="contained"
              disableElevation
            >
              Register
            </Button>
          </Link>
        </Box>}
    </Box>
  )
}

export default UserAvatar
