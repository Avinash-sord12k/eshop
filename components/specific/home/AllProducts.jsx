import React from 'react'
import { Box, Typography } from '@mui/material'
import Card from '@/components/common/ProductCard/ProductCard'
import Products from "@/models/Products";
import { connect } from '@/database/connect';
import LoadOnScroll from './LoadOnScroll.jsx/LoadOnScroll';

const AllProducts = async () => {
  await connect();
  let basicProducts = await Products.find({ isFeatured: false, isOnSale: false })
    .select('_id name price category image')
    .sort({ createdAt: -1 })
    .skip(0)
    .limit(4)
    .lean();

  let featuredProducts = await Products.find({ isFeatured: true })
    .select('_id name price description category image rating').lean();

  let onSaleProducts = await Products.find({ isOnSale: true })
    .select('_id name price description category image rating').lean();

  basicProducts = basicProducts.map(item => { item._id = item._id.toString(); return item; });
  featuredProducts = featuredProducts.map(item => { item._id = item._id.toString(); return item; });
  onSaleProducts = onSaleProducts.map(item => { item._id = item._id.toString(); return item; });

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

      {basicProducts.length > 0 && <LoadOnScroll initialBasicProducts={basicProducts} />}


    </>
  )
}

export default AllProducts
