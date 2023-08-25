"use client";
import { Badge, IconButton, Tooltip, Avatar, Menu, MenuItem, Typography, Box, Button } from '@mui/material';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { stringToColor } from '@/utils/extras/extras';
import { useRouter } from 'next/navigation';
import { setIsAuth, setUsername, setRole, setPermissions, setEmail, setError, setLogout } from '@/store/authSlice/authSlice';


const UserAvatar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [client, setClient] = React.useState(false);
  const settings = [
    {
      title: 'Profile',
      description: 'Manage and personalize your profile information.',
      clickFunc: () => { router.push(`/profile`) },
      permissions: [],
    },
    {
      title: 'Dashboard',
      description: 'Access your administrative dashboard.',
      clickFunc: () => { router.push('/dashboard') },
      permissions: [],
    },
    {
      title: 'Wishlist',
      description: 'Manage your wishlist.',
      clickFunc: () => { router.push('/wishlist') },
      permissions: [],
    },
    {
      title: 'Logout',
      description: 'Logout from your account.',
      // clickFunc: () => {  },
      clickFunc: () => { handleCloseUserMenu(); handleLogOut() },
      permissions: [],
    },
  ];


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
      router.push('/');
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { isAuth, role, image, username } = useSelector(state => state.auth);
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0].toUpperCase()}`,
    };
  }

  React.useEffect(() => {
    setClient(true);
  }, []);

  return (
    <div>
      {client && (isAuth
        ? <>
          <Tooltip title="Open settings">
            <Badge color={'secondary'}
              badgeContent={stringAvatar(role).children}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {
                  image ? <Avatar alt="user image" src={image} />
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
              <MenuItem key={setting.title} onClick={() => { setting.clickFunc() }}>
                <Typography textAlign="center">{setting.title}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </>
        : <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Button
            href="/auth/signin"
            color="inherit"
            sx={{ display: 'block' }}
          >
            Login
          </Button>
          <Button
            href="/auth/signup"
            color="inherit"
            sx={{ display: 'block' }}
          >
            Register
          </Button>
        </Box>)}
    </div>
  )
}

export default UserAvatar
