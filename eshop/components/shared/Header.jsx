"use client";

import React from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import {
  setIsAuth,
  setUsername,
  setRole,
  setPermissions,
  setEmail,
  setError,
} from '@/store/authSlice/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { stringToColor } from '@/utils/extras/extras';

const pages = [
  {
    title: 'Products',
    description: 'Explore our wide range of high-quality products.',
    href: '/products',
    rolesPermitted: ['shopper', 'user', 'admin'],
  },
  {
    title: 'Dashboard',
    description: 'Access your administrative dashboard.',
    href: '/dashboard',
    rolesPermitted: ['admin'],
  }
];
const userSpecificPages = [
  {
    title: 'Wishlist',
    description: 'Curate your desired items for a personalized shopping experience.',
    href: '/wishlist',
    permissions: [{ resource: "wishlist", actions: ["read"] }],
  },
  {
    title: 'Cart',
    description: 'Efficiently manage your shopping cart for seamless purchases.',
    href: '/cart',
    permissions: [{ resource: "cart", actions: ["read"] }],
  },
  {
    title: 'Orders',
    description: 'Track and manage your orders for a hassle-free experience.',
    href: '/orders',
    permissions: [{ resource: "orders", actions: ["read"] }],
  },
  {
    title: 'Reviews',
    description: 'View and manage your reviews for a personalized experience.',
    href: '/reviews',
    permissions: [{ resource: "reviews", action: ["read"] }],
  },
  {
    title: 'Shop',
    description: 'View and manage your shop for a personalized experience.',
    href: '/shop',
    permissions: [{ resource: "shop", action: ["read"] }],
  },
];


function TopNav() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { isAuth, username, role, image, permissions, email, userId, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

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
      title: 'Logout',
      description: 'Logout from your account.',
      // clickFunc: () => {  },
      clickFunc: () => { handleCloseUserMenu(); handleLogOut() },
      permissions: [],
    },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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


  const handlePermit = (neededPermission, userPermission) => {
    if (Object.keys(userPermission).length === 0) {
      return false;
    }
    if (Object.keys(neededPermission).length === 0) {
      return true;
    }
    return neededPermission.every(needed => {
      const user = userPermission.find(user => user.resource === needed.resource);
      if (!user || !needed.actions.every(action => user.actions.includes(action))) return false;
      return true;
    });
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0].toUpperCase()}`,
    };
  }


  return (
    <AppBar position="relative">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShoppingBagIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            eSHOP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
              {userSpecificPages.map((page) => (
                handlePermit(page.permissions, permissions)
                  ? (<MenuItem key={page.title} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>)
                  : null
              ))}
            </Menu>
          </Box>
          <ShoppingBagIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            eSHOP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.title}
              </Button>
            ))}
            {userSpecificPages.map((page) => (
              handlePermit(page.permissions, permissions)
                ? (<MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>)
                : null
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {(isAuth
              ? <>
              {console.log("auth status: ", isAuth, username)}
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
                    <MenuItem key={setting.title} onClick={() => {setting.clickFunc()}}>
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
                  sx={{ mr: 2, display: 'block' }}
                >
                  Login
                </Button>
                <Button
                  href="/auth/signup"
                  color="inherit"
                  sx={{ mr: 2, display: 'block' }}
                >
                  Register
                </Button>
              </Box>)}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopNav;
