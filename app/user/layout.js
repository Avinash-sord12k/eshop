import { Box } from '@mui/material';
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SideBar from '@/components/shared/SideBar/SideBar';
import { cookies } from 'next/headers';
import { getUserfromJwt } from '@/utils/auth/auth';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const UserPageLayout = async ({ children }) => {
  // const cookieStore = cookies();
  // const token = cookieStore.get('token').value;
  // const { email } = await getUserfromJwt(token);
  // console.log("email: ", email);

  const navLinks = [
    { title: 'Home', path: '/', icons: <HomeIcon /> },
    { title: 'Profile', path: `/user/profile`, icons: <AccountCircleIcon /> },
    { title: 'Orders', path: `/user/orders`, icons: <LocalShippingIcon /> },
    { title: 'Wishlist', path: `/wishlist`, icons: <BookmarkIcon /> },
    { title: 'Cart', path: `/cart`, icons: <ShoppingCartIcon />}
  ];

  return (
    <>
      <SideBar navLinks={navLinks} />
      <Box sx={{
        mt: { xs: '10px', sm: '20px' },
        ml: { xs: '10px', sm: '75px' },
        transition: 'margin-left 0.3s ease-in-out',
        mr: { xs: '10px', sm: '15px', md: '20px', lg: '30px', xl: '40px' },
      }}>
        {children}
      </Box>
    </>
  );
};

export default UserPageLayout
