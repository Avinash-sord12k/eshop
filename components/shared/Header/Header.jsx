import React from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';
import { cookies } from 'next/headers';
import { getUserfromJwt } from '@/utils/auth/auth';
import HeaderItems from './HeaderItems';
import Users from '@/models/Users'

const TopNav = async () => {
  const token = cookies().get('token').value;
  const { username, email, role } = await getUserfromJwt(token);
  const user = await Users.findOne({ email });
  const image = user.image || null;
  const roleName = role.name.toLowerCase();
  const userPermissions = role.permissions;

  const pages = [
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
      href: `${roleName}/orders`,
      permissions: [{ resource: "orders", actions: ["read"] }],
    },
  ];
  const userSpecificPages = [
    {
      title: 'Products',
      description: 'View and manage your shop for a personalized experience.',
      href: `${roleName}/products`,
      permissions: [{ resource: "products", actions: ["read", "create", "update", "delete"] }],
    },
    {
      title: 'Profile',
      description: 'Manage and personalize your profile information.',
      href: `${roleName}/profile`,
      permissions: [],
    },
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
          <HeaderItems props={props} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopNav;
