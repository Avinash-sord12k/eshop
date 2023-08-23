import { Box, Typography } from '@mui/material'
import Swiper from '@/components/specific/home/Swiper'
import React from 'react'
import AllProducts from '@/components/specific/home/AllProducts'

const Home = () => {
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
