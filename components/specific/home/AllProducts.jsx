import React from 'react'
import { Box, Typography } from '@mui/material'
import Card from '@/components/common/ProductCard/ProductCard'
import Products from "@/models/Products";
import { connect } from '@/database/connect';

const AllProducts = async () => {
  let basicProducts = [];
  let featuredProducts = [];
  let onSaleProducts = [];
  try {
    await connect();
    basicProducts = await Products.find({ isFeatured: false, isOnSale: false })
      .select('_id name price description category image').lean();

    featuredProducts = await Products.find({ isFeatured: true })
      .select('_id name price description category image').lean();

    onSaleProducts = await Products.find({ isOnSale: true })
      .select('_id name price description category image').lean();
  } catch (error) {
    throw new Error(error.message);
  }

  // console.log(basicProducts, featuredProducts, onSaleProducts);

  return (
    <>
      {/* {basicProducts.map(item => <p>{JSON.stringify(item)}</p>)} */}

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
              <Card key={product._id} product={product} />
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
              <Card key={product._id} product={product} />
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
              <Card key={product._id} product={product} />
            ))}
          </Box>
        </>
      }


    </>
  )
}

export default AllProducts
