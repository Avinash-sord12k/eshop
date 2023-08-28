"use client";
import React from 'react';
import CustomAlert from '@/components/common/Alert';
import { Grid, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { CartListItem, CartSummary } from '@/components/specific/cart/CartComponents';
import EmptyCart from '@/components/specific/cart/EmptyCart';

const CartPage = () => {
  let { cart, cartItems, cartTotal } = useSelector(state => state.cart);
  return (
    <>
      <CustomAlert />
      {cart.length !== 0
        ? <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={{ mt: 4 }}>
              {
                cart.map((item, index) => <CartListItem key={index} item={item} supressHydrationWarning />)
              }
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <CartSummary cart={cart} cartItems={cartItems} />
          </Grid>
        </Grid>
        : <EmptyCart />}
    </>
  )
}

export default CartPage
