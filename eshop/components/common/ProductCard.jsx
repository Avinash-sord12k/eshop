"use client";
import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

const ProductCardContainer = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  borderRadius: theme.shape.borderRadius,
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: 194,
}));

export default function ProductCard() {
  const product = {
    productImage:
      'https://www.boat-lifestyle.com/cdn/shop/products/IM1300_main_4_600x.png?v=1632715015',
    productTitle: 'Shrimp and Chorizo Paella',
    productDescription:
      'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
    productPrice: 100,
    productCategory: 'Food',
    productRating: 4.5,
  };

  const handleAddToCart = () => {
    console.log('Add to cart clicked');
  };

  return (
    <ProductCardContainer>
      <ProductImage component="img" image={product.productImage} alt="Product" />
      <CardContent >
        <Typography variant="h6">{product.productTitle}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.productCategory}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.productDescription}
        </Typography>
        <Typography variant="h6" color="text.primary">
          <span style={{ marginRight: '6px' }}>₹</span>
          {product.productPrice}
        </Typography>
        <Rating
          name="product-rating"
          value={product.productRating}
          precision={0.5}
          readOnly
        />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <BookmarkAddIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Button
          sx={{ marginLeft: 'auto' }}
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
          startIcon={<AddShoppingCartIcon />}
        >
          Add to Cart
        </Button>
      </CardActions>
    </ProductCardContainer>
  );
}
