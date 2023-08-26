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
    { title: 'Profile', path: `/shopper/profile`, icons: <AccountCircleIcon /> },
    { title: 'Dashboard', path: `/shopper/dashboard`, icons: <DashboardIcon /> },
    { title: 'Orders', path: `/shopper/orders`, icons: <LocalShippingIcon /> },
    { title: 'Products', path: `/shopper/products`, icons: <StorefrontIcon /> },
    { title: 'Earning', path: `/shopper/earning`, icons: <PaidIcon /> },
    { title: 'Wishlist', path: `/wishlist`, icons: <BookmarkIcon /> },
  ];

  return (
    <>
      <SideBar navLinks={navLinks} />
      <Box sx={{
        marginLeft: '100px',
        transition: 'margin-left 0.3s ease-in-out',
        marginRight: '40px',
      }}>
        {children}
      </Box>
    </>
  );
};

export default UserPageLayout
