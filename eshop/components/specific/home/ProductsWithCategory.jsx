import React from 'react';
import { Box, Typography } from '@mui/material';
import Card from '@/components/common/ProductCard/ProductCard';
import Products from "@/models/Products";
import { connect } from '@/database/connect';

const ProductsWithCategory = async ({ category }) => {
  await connect();

  // Convert the category to lowercase for case-insensitive search
  const search = { category: { $regex: category, $options: 'i' } };
  const products = await Products.find(search).lean();

  return (
    <>
      <Typography variant="h6" fontWeight={'bold'} mt={10}>Category - {category} </Typography>
      {
        products.length === 0 ?
          (<Typography variant="h6" fontWeight={'bold'} mt={10}>No products found in this category</Typography>)
        : (<Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gridGap: '1rem',
            my: 2,
          }}>
            {products.map(product => (
              <Card key={product._id} product={product} />
            ))}
          </Box>)
      }
    </>
  );
}

export default ProductsWithCategory;
