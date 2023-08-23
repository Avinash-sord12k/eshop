"use client";
import { Box, Grid, Typography } from '@mui/material';
import React from 'react'
import ProductInfoCard from './ProductInfoCards';
import CustomAlert from '@/components/common/Alert';


const ProductsView = (props) => {
  const { products, getProducts, openModal } = props;
  return (
    <Box>
      <CustomAlert />
      <Grid container spacing={5}>
        {(products && products.length != 0) ? (products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ProductInfoCard options={{ product, openModal, getProducts }} index={index} />
          </Grid>))) : <Typography variant="h6">No products found</Typography>
        }
      </Grid>
    </Box>
  )
}

export default ProductsView
