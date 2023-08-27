import React from 'react'
import { Box, Typography } from '@mui/material'
import Card from '@/components/common/ProductCard/ProductCard'
import Products from "@/models/Products";
import { connect } from '@/database/connect';

const AllProducts = async () => {
  await connect();
  const basicProducts = await Products.find({ isFeatured: false, isOnSale: false });
  const featuredProducts = await Products.find({ isFeatured: true });
  const onSaleProducts = await Products.find({ isOnSale: true });

  return (
    <>

      {onSaleProducts.length > 0 &&
        <>
          <Typography variant="h6" fontWeight={'bold'} mt={10}> SALE </Typography>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gridGap: '1rem',
            my: 2,
            justifyItems: 'stretch',
          }}>
            {onSaleProducts.map(product => (
              <Card key={product._doc._id} product={product._doc} />
            ))}
          </Box>
        </>}

      {
        featuredProducts.length > 0 &&
        <>
          <Typography variant="h6" fontWeight={'bold'} mt={10}> Featured Products </Typography>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gridGap: '1rem',
            my: 2,
          }}>
            {featuredProducts.map(product => (
              <Card key={product._doc._id} product={product._doc} />
            ))}
          </Box>
        </>
      }

      {
        basicProducts.length > 0 &&
        <>
          <Typography variant="h6" fontWeight={'bold'} mt={10}> All Products </Typography>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gridGap: '1rem',
            my: 2,
          }}>
            {basicProducts.map(product => (
              <Card key={product._doc._id} product={product._doc} />
            ))}
          </Box>
        </>
      }


    </>
  )
}

export default AllProducts
