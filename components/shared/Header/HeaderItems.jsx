"use client"
import React from 'react'
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Link from 'next/link';
import CartDetails from './CartDetails';
import UserAvatar from './UserAvatar';


const HeaderItems = ({ props }) => {
  const { userPermissions, pages, userSpecificPages } = props;
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handlePermit = (neededPermission) => {

    if (Object.keys(userPermissions).length === 0 || userPermissions.length === 0) {
      return false;
    }
    if (Object.keys(neededPermission).length === 0 || neededPermission.length === 0) {
      return true;
    }
    return neededPermission.every(needed => {
      const user = userPermissions.find(user => user.resource === needed.resource);
      if (!user || !needed.actions.every(action => user.actions.includes(action))) return false;
      return true;
    });
  };

  return (
    <>
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
              <Link href={page.href} style={{
                textDecoration: 'none',
                color: '#222',
              }} >
                {page.title}
              </Link>
            </MenuItem>
          ))}
          {userSpecificPages.map((page) => (
            handlePermit(page.permissions)
              ? (
                <Link href={page.href} key={page.title}
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    color: '#222'
                  }}>
                  <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                    {page.title}
                  </MenuItem>
                </Link>
              )
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
          <Link
            href={page.href}
            key={page.title}
            style={{
              my: 2,
              color: 'white',
              display: 'block',
              padding: '4px 8px',
              textDecoration: 'none'
            }}
          >
            <MenuItem>
              <Typography>{page.title}</Typography>
            </MenuItem>
          </Link>
        ))}
        {userSpecificPages.map((page) => (
          handlePermit(page.permissions)
            ?
            <Link key={page.title} href={page.href} style={{
              my: 2,
              color: 'white',
              display: 'block',
              padding: '4px 8px',
              textDecoration: 'none'
            }}>
              <MenuItem>
                <Typography>{page.title}</Typography>
              </MenuItem>
            </Link>
            : null
        ))}
      </Box>
      <Box sx={{ flexGrow: 0, display: 'flex', gap: 4 }} suppressHydrationWarning={true}>
        <CartDetails />
        <UserAvatar props={props} />
      </Box>
    </>
  )
}

export default HeaderItems
