import { Box } from '@mui/material';
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PaidIcon from '@mui/icons-material/Paid';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SideBar from '@/components/shared/SideBar/SideBar';
import { cookies } from 'next/headers';
import { getUserfromJwt } from '@/utils/auth/auth';


const UserPageLayout = async ({ children }) => {
  const cookieStore = cookies();
  const token = cookieStore.get('token').value;
  const { email } = await getUserfromJwt(token);
  console.log("email: ", email);

  const navLinks = [
    { title: 'Home', path: '/', icons: <HomeIcon /> },
    { title: 'Products', path: `/shopper/products`, icons: <StorefrontIcon /> },
    { title: 'Orders', path: `/shopper/orders`, icons: <LocalShippingIcon /> },
    // { title: 'Dashboard', path: `/shopper/dashboard`, icons: <DashboardIcon /> },
    // { title: 'Earning', path: `/shopper/earning`, icons: <PaidIcon /> },
    { title: 'Wishlist', path: `/wishlist`, icons: <BookmarkIcon /> },
    { title: 'Profile', path: `/shopper/profile`, icons: <AccountCircleIcon /> },
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
