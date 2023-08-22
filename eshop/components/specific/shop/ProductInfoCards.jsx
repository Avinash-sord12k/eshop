"use client";
import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductCardContainer = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  borderRadius: theme.shape.borderRadius,
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: 194,
}));

export default function ProductInfoCard({ options, index }) {

  const { openModal } = options;
  const { product } = options;
  const {
    name,
    price,
    stock,
    image,
    description,
    isFeatured,
    isOnSale,
    category, } = product;
    
  return (
    <ProductCardContainer>
      <ProductImage component="img" image={image} alt="Product" />
      <CardContent >
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="h6" color="text.primary">
          <span style={{ marginRight: '6px' }}>₹</span>
          {price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <DeleteIcon />
        </IconButton>
        <Button
          sx={{ marginLeft: 'auto' }}
          variant="contained"
          color="primary"
          onClick={() => openModal(index)}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      </CardActions>
    </ProductCardContainer>
  );
}
