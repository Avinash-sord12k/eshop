"use client";
import { Box, Grid, Typography } from '@mui/material';
import React from 'react'
import ProductInfoCard from './ProductInfoCards';


const ProductsView = (props) => {
  const { products, getProducts, openModal } = props;
  return (
    <Box mb={5}>
      <Grid container spacing={5} >
        {(products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ProductInfoCard options={{ product, openModal, getProducts }} index={index} />
          </Grid>)))
        }
      </Grid>
    </Box>
  )
}

export default ProductsView
