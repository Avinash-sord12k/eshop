import React from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';
import { cookies } from 'next/headers';
import { getUserfromJwt } from '@/utils/auth/auth';
import HeaderItems from './HeaderItems';
import Users from '@/models/Users'

const TopNav = async () => {
  let userPermissions = [];
  try {
    var token = cookies().get('token').value;
    var isAuth = true;
    var { username, email, role } = await getUserfromJwt(token);
    var user = await Users.findOne({ email });
    var image = user.image || null;
    var roleName = role.name.toLowerCase();
    userPermissions = role.permissions;
  } catch (error) {
    var isAuth = false;
  }
  console.log("is auth in header.jsx: ", isAuth);

  const pages = [
    {
      title: 'Wishlist',
      description: 'Curate your desired items for a personalized shopping experience.',
      href: `${process.env.NEXT_PUBLIC_CURRENT_DOMAIN}/wishlist`,
      permissions: [{ resource: "wishlist", actions: ["read"] }], 
      visibleToAll: true,
    },
    {
      title: 'Cart',
      description: 'Efficiently manage your shopping cart for seamless purchases.',
      href: `${process.env.NEXT_PUBLIC_CURRENT_DOMAIN}/cart`,
      permissions: [{ resource: "cart", actions: ["read"] }],
      visibleToAll: true,
    },
    {
      title: 'Orders',
      description: 'Track and manage your orders for a hassle-free experience.',
      href: `${process.env.NEXT_PUBLIC_CURRENT_DOMAIN}/${roleName}/orders`,
      permissions: [{ resource: "orders", actions: ["read"] }],
      visibleToAll: false,
    },
  ];
  const userSpecificPages = [
    {
      title: 'Products',
      description: 'View and manage your shop for a personalized experience.',
      href: `${process.env.NEXT_PUBLIC_CURRENT_DOMAIN}/${roleName}/products`,
      permissions: [{ resource: "products", actions: ["read", "create", "update", "delete"] }],
    },
    // {
    //   title: 'Profile',
    //   description: 'Manage and personalize your profile information.',
    //   href: `${process.env.NEXT_PUBLIC_CURRENT_DOMAIN}${roleName}/profile`,
    //   permissions: [],
    // },
  ];
  const props = {
    username,
    email,
    image,
    roleName,
    userPermissions,
    pages,
    userSpecificPages,
  }

  return (
    <AppBar position="relative" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HeaderItems props={{...props, isAuth}} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopNav;
