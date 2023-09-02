import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import Card from '@/components/common/ProductCard/ProductCard';
import Products from "@/models/Products";
import { connect } from '@/database/connect';
import Link from 'next/link';

const ProductsWithCategory = async ({ category }) => {
  await connect();

  // Convert the category to lowercase for case-insensitive search
  const search = { category: { $regex: category, $options: 'i' } };
  const products = await Products.find(search).lean();

  return (
    <Box sx={{ padding: '1rem' }}>
      <Typography variant="h6" fontWeight="bold" mt={2}>
        Category - {category}
      </Typography>
      {products.length === 0 ? (
        <Paper sx={{ mt: 2, p: 2, borderRadius: '4px', textAlign: 'center', height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h6" fontWeight="bold" color="textSecondary">
            No products found in this category
          </Typography>
          <Typography variant='body2' fontWeight={'thin'} color={'textSecondary'}>
            Please try another category
          </Typography>
          <Link href={'/products'}>
            <Button variant='contained' >
              Browse Others
            </Button>
          </Link>
        </Paper>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gridGap: '1rem',
            my: 2,
          }}
        >
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ProductsWithCategory;

