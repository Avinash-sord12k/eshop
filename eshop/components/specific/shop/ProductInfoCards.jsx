"use client";
import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Chip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setAlert } from '@/store/uiStateSlice/uiStateSlice';


const ProductCardContainer = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4], // Add a subtle shadow
  display: 'flex',
  flexDirection: 'column',
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: 194,
  objectFit: 'cover', // Ensure the image fits well in the container
}));

export default function ProductInfoCard({ options, index }) {
  const { openModal, getProducts } = options;
  const { product } = options;
  const {
    name,
    price,
    stock,
    image,
    description,
    isFeatured,
    isOnSale,
    category,
    _id,
  } = product;
  const dispatch = useDispatch();
  const handleDelete = async (productId) => {
    console.log('delete product: ', productId);
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      dispatch(setAlert({ open: true, severity: 'success', message: data.body.message }));
      getProducts();
    } catch (error) {
      console.log(error);
      dispatch(setAlert({ open: true, severity: 'error', message: error.message }));
    }
  };


  return (
    <>
      <ProductCardContainer>
        {image ? (
          <ProductImage component="img" image={image} alt="Product" />
        ) : (
          <ProductImage
            component="img"
            image="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
            alt="Product"
          />
        )}
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {name}
          </Typography>
          <Chip label={category} color="secondary" size="small" />
          <Typography variant="body2" color="text.secondary" mt={1}>
            {description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Typography variant="h6" color="primary">
              ₹{price}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {stock} Left
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton aria-label="delete" onClick={() => handleDelete(_id)}>
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
    </>
  );
}
