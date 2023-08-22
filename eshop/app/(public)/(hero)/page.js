import { Box, Container, Typography } from '@mui/material'
import Card from '@/components/common/ProductCard'
import Swiper from '@/components/specific/home/Swiper'
import React from 'react'

const Home = () => {
  return (
    <>
      <Box>
        <Box sx={{my: 2}}>
          <Swiper />
        </Box>
        <Typography variant='h5' mt={5} fontWeight={'bold'} gutterBottom>
          Products
        </Typography>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gridGap: '1rem',
          my: 2,
        }}>
          <Card />
        </Box>
      </Box>
    </>
  )
}

export default Home
