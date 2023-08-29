import React from 'react'
import { Box, Typography } from '@mui/material';
import ProductCard from 'components/common/ProductCard/ProductCard';
import Products from 'models/Products';


const SameCategoryProducts = async ({ category }) => {
  const sameCategoryProducts = await Products.find({ category })
    .select('_id name price description category image')
    .limit(4)
    .lean();

  const convertIdToString = products => {
    return products.map(product => {
      product._id = product._id.toString(); // Convert _id to string
      return product;
    });
  };

  convertIdToString(sameCategoryProducts);

  return (
    <>
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
    </>
  )
}

export default SameCategoryProducts
