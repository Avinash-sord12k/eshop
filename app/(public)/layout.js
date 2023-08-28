import Categories from '@/components/shared/Categories'
import Footer from '@/components/shared/Footer/Footer'
import Header from '@/components/shared/Header/Header'
import { Box, Container } from '@mui/material'
import React from 'react'

const MainLayout = ({ children }) => {
  return (
    <Box>
      <Header />
      <Categories />
      <Container sx={{ minHeight: '80vh' }}>
        {children}
      </Container>
      <Footer />
    </Box>
  )
}

export default MainLayout
