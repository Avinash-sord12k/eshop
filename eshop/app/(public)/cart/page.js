"use client";
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Grid, Paper, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useSelector, useDispatch } from 'react-redux';
import { addCartItem, removeCartItem, deleteCartItem, resetCart } from '@/store/cartSlice/cartSlice';

const CartListItem = ({ item }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <Card sx={{ display: 'flex', marginBottom: theme.spacing(2) }}>
      <CardMedia
        component="img"
        sx={{ width: 150, minWidth: 150, objectFit: 'cover' }}
        image={item.image}
        alt={item.name}
      />
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" sx={{ marginBottom: theme.spacing(1) }}>
            {item.name}
          </Typography>
          <Box>
            <IconButton onClick={() => dispatch(removeCartItem(item))}>
              <RemoveCircleIcon />
            </IconButton>
            <Typography variant="body1" sx={{ display: 'inline-block', margin: '0 10px' }}>
              {item.quantity}
            </Typography>
            <IconButton onClick={() => dispatch(addCartItem(item))}>
              <AddCircleIcon />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle1" color="primary">
              ₹{Math.floor(item.price)}
            </Typography>
          </Box>
          <IconButton aria-label="remove from cart" color="error" onClick={() => dispatch(deleteCartItem(item))}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};
const CheckOutCart = ({ cart }) => {
  const handleCreateOrder = () => {

  }
  return (
    <Box sx={{ mt: 4 }}>
      <Button fullWidth variant='contained'>Place order</Button>
    </Box>
  )
};
const CartSummary = ({ cart, cartItems }) => {
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  return (
    <Box sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" fontWeight={'bold'}>Cart Summary</Typography>
        <hr />
        {cart.map(item => (
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }} key={item.id}>
            <Typography variant="body1">
              {item.name} {item.quantity > 1 ? `x ${item.quantity}` : null}
            </Typography>
            <Typography variant="body1">
              ₹{Math.floor(item.price * item.quantity)}
            </Typography>
          </Box>
        ))}
        <hr />
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Typography variant="body1">Total items</Typography>
          <Typography variant="body1">{cartItems}</Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Typography variant="body1">Total</Typography>
          <Typography variant="body1">₹{Math.floor(cartTotal)}</Typography>
        </Box>
        <hr />
        <CheckOutCart cart={cart} />
      </Paper>
    </Box>
  );
};

const CartPage = () => {
  // const dispatch = useDispatch();
  const { cart, cartItems, cartTotal } = useSelector(state => state.cart);
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Box sx={{ mt: 4 }}>
          {
            cart.map((item, index) => <CartListItem key={index} item={item} />)
          }
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <CartSummary cart={cart} cartItems={cartItems} />
      </Grid>
    </Grid>
  )
}

export default CartPage
