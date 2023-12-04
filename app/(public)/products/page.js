import { Box, Typography } from '@mui/material'
import Swiper from '@/components/specific/home/Swiper'
import React from 'react'
import AllProducts from '@/components/specific/home/AllProducts'

const Home = () => {
  // throw new Error('Something went wrong!');
  return (
    <>
      <Box>
        <Box sx={{ my: 2 }}>
          <Swiper />
        </Box>
        <AllProducts />
      </Box>
    </>
  )
}

export default Home
