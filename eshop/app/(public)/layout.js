import Categories from '@/components/shared/Categories'
import Header from '@/components/shared/Header/Header'
import { Box, Container } from '@mui/material'
import React from 'react'

const MainLayout = ({children}) => {
  return (
    <Box sx={{position: "sticky"}}>
     <Header />
     <Categories />
      <Container sx={{minHeight: '80vh'}}>
        {children}
      </Container>
    </Box>
  )
}

export default MainLayout
