"use client";
import React from 'react';
import { IconButton, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const CartDetails = () => {
  const router = useRouter();
  const { cartItems } = useSelector(state => state.cart);

  return (
    <Box mr={5}>
      <IconButton color="inherit" aria-label="cart" onClick={() => router.push("/cart")}>
        <Badge badgeContent={cartItems} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Box>
  )
}

export default CartDetails
