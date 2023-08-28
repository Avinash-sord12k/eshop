"use client";
import { Container } from '@mui/material'
import React from 'react'
import { Card, CardContent, CardMedia, Typography, Button, Box, Grid, Paper, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '@/store/wishlistSlice/wishlistSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { notFound } from 'next/navigation';

const WishListItem = ({ item }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);

    return `${day}-${month}-${year}`;
  };
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
          <Typography variant="body2" color="text.secondary">
            Added on: {formatDate(item.dateAdded)} {/* Replace with the actual date */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Current Price: ₹{Math.floor(item.price)}
          </Typography>
          <Typography variant="body2" color={item.inStock ? 'success' : 'error'}>
            {item.inStock ? 'In Stock' : 'Out of Stock'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle1" color="primary">
              ₹{Math.floor(item.price)}
            </Typography>
          </Box>
          <Box>
            {item.inStock && (
              <IconButton aria-label="add to cart" color="primary">
                <ShoppingCartIcon />
              </IconButton>
            )}
            <IconButton aria-label="remove from cart" color="error" onClick={() => dispatch(removeFromWishlist(item))}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const WishlistPage = () => {
  const wishlist = useSelector(state => state.wishlist.wishlist);
  console.log(wishlist);
  return (
    <Container>
      <h4>Wishlist</h4>
      <React.Suspense fallback={<h1>loading...</h1>}>
        <Box>
          {wishlist.length === 0
            ? notFound()
            : wishlist.map(item => <WishListItem item={item} key={item.name} />)
          }
        </Box>
      </React.Suspense>
    </Container>
  )
}

export default WishlistPage
