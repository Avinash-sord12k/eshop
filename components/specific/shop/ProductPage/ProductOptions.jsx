"use client";
import React from 'react'
import { Box, Button, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch } from 'react-redux';
import { addCartItem } from '@/store/cartSlice/cartSlice'
import { addToWishlist, removeFromWishlist } from '@/store/wishlistSlice/wishlistSlice'
import { setAlert } from '@/store/uiStateSlice/uiStateSlice';
import CustomAlert from '@/components/common/Alert';

const CartandWisthlist = ({ product }) => {
  const dispatch = useDispatch();
  const [wish, setWish] = React.useState(false);
  const { _id, name, price, category, image, shopperId } = product;
  const newProduct = { id: _id, name, price, category, image, quantity: 1, shopperId };

  const addToCart = () => {
    dispatch(addCartItem(newProduct));
    dispatch(setAlert({ open: true, message: 'Product added to cart', severity: 'success' }));
  }
  const toggleWish = () => {
    setWish(!wish);
    if (wish) {
      dispatch(removeFromWishlist(newProduct));
      dispatch(setAlert({ open: true, message: 'Product removed from wishlist', severity: 'success' }));
      return;
    }
    dispatch(addToWishlist(newProduct));
    dispatch(setAlert({ open: true, message: 'Product added to wishlist', severity: 'success' }));
  }
  return (
    <Box sx={{ mt: 3 }}>
      <CustomAlert />
      <Button variant="contained" color="primary" 
        startIcon={<AddShoppingCartIcon />}
        onClick={addToCart}>
        Add to Cart
      </Button>
      <IconButton color="secondary" sx={{ ml: 2 }} onClick={toggleWish}>
        {wish ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Box>
  )
}

export default CartandWisthlist
