import React from 'react';
import { Box, Grid, Typography, Rating, Container, CircularProgress } from '@mui/material';
import { connect } from '@/database/connect';
import Products from '@/models/Products';
import ProductCard from '@/components/common/ProductCard/ProductCard'
import ProductOptions from '@/components/specific/shop/ProductPage/ProductOptions';
import Image from 'next/image';
import SameCategoryProducts from '@/components/specific/shop/ProductPage/SameCategoryProducts';
import SellerInfo from '@/components/specific/shop/ProductPage/SellerInfo';


const ProductPage = async ({ params }) => {

  await connect();
  const product = await Products.findById(params.id)
    .select('_id name price description category image shopperId')
    .lean();

  const { category } = product;
  product._id = product._id.toString();

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Box elevation={2} >
            {/* // not using next/image because of hostname issue. */}
            <img src={product.image} alt={product.name} style={{
              width: '300px',
              // height: '300px',
              // objectFit: 'cover',
            }} />
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
            {product.description ? <Typography variant="body1" color='textSecondary' sx={{ mt: 2 }}>
              {product.description.slice(0, 300) + '...'}
            </Typography> : null}
            <Box 
              sx={{
                display: 'inline',
                py: 2,
                borderRadius: '4px',
                color: 'primary.main',
                my: 4,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }
              }}>
              <React.Suspense fallback={<CircularProgress />}>
                <SellerInfo shopperId={product.shopperId} />
              </React.Suspense>
            </Box>
            <ProductOptions product={product} />
          </Box>
        </Grid>
      </Grid>
      <React.Suspense fallback={<CircularProgress />}>
        <SameCategoryProducts category={category} />
      </React.Suspense>
    </Container>
  );
};

export default ProductPage;
