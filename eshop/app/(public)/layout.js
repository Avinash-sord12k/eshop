import Categories from '@/components/shared/Categories'
import TopNav from '@/components/shared/Header'
import { Box, Container } from '@mui/material'
import React from 'react'

const MainLayout = ({children}) => {
  return (
    <Box sx={{position: "sticky"}}>
     <TopNav />
     <Categories />
      <Container sx={{minHeight: '80vh'}}>
        {children}
      </Container>
    </Box>
  )
}

export default MainLayout
