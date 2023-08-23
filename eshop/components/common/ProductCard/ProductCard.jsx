"use client";
import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import CardOptions from './CardOptions';
import { Chip } from '@mui/material';

const ProductCardContainer = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  borderRadius: theme.shape.borderRadius,
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: 194,
}));

export default function ProductCard({ product }) {

  const { _id, name, price, descirption, category, image } = product;

  return (
      <ProductCardContainer>
      <ProductImage component="img" image={image} alt="Product" />
      <CardContent >
        <Typography variant="body2" fontWeight={'bold'}>{name}</Typography>
        {/* <Typography variant="body2" color="text.secondary">
          {category}
        </Typography> */}
        <Chip label={category} color="primary" size="small" />
        <Typography variant="body2" color="text.secondary">
          {descirption}
        </Typography>
        <Typography variant="h6" color="text.primary">
          <span style={{ marginRight: '6px' }}>₹</span>
          {price}
        </Typography>
        <Rating
          name="product-rating"
          value={4.5}
          precision={0.5}
          readOnly
        />
      </CardContent>
      <CardOptions cardData={product} />
    </ProductCardContainer>
  );
}
