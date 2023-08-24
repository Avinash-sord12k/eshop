import { Box, Grid, Typography, Button, IconButton, Rating } from '@mui/material';
import React from 'react';
import { connect } from '@/database/connect';
import Products from '@/models/Products';
import ProductOptions from '@/components/specific/shop/ProductPage/ProductOptions';


const ProductPage = async ({ params }) => {

  const { id } = params;
  await connect();
  const product = await Products.findById(params.id);

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ boxShadow: 1 }}>
            <img src={product.image} alt={product.name} width={300} height={300} />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: '600' }}>
              {product.name[0].toUpperCase() + product.name.slice(1)}
            </Typography>
            <Rating name="read-only" value={4} readOnly />
            <Typography variant="h4" color="primary" sx={{ mt: 1 }}>
              ₹{product.price}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {product.description}
            </Typography>
            <ProductOptions product={product} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductPage;
