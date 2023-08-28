import React from 'react';
import { Box, Grid, Typography, Button, IconButton, Rating, Container } from '@mui/material';
import { connect } from '@/database/connect';
import Products from '@/models/Products';
import ProductCard from '@/components/common/ProductCard/ProductCard'
import ProductOptions from '@/components/specific/shop/ProductPage/ProductOptions';


const ProductPage = async ({ params }) => {

  const { id } = params;
  await connect();
  const product = await Products.findById(params.id)
    .select('_id name price description category image')
    .lean();

  const { category } = product;
  const sameCategoryProducts = await Products.find({ category: category })
    .select('_id name price description category image')
    .limit(4)
    .lean();

  const convertIdToString = products => {
    return products.map(product => {
      product._id = product._id.toString(); // Convert _id to string
      return product;
    });
  };

  product._id = product._id.toString();
  convertIdToString(sameCategoryProducts);


  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Box elevation={2} >
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
      {sameCategoryProducts.length > 0 &&
        <Box my={4}>
          <Typography variant="h6" fontWeight={'bold'} mt={10}>
            More from {category[0].toUpperCase() + category.slice(1)}
          </Typography>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gridGap: '1rem',
            my: 2,
            justifyItems: 'stretch',
          }}>
            {sameCategoryProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </Box>
        </Box>}
    </Container>
  );
};

export default ProductPage;
