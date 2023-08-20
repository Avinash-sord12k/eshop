import { Box } from '@mui/material'
import React from 'react'

const ProductByCategory = ({params}) => {
  return (
    <Box sx={{mt: "10px"}}>
      <h4>Product by category: {params.category}</h4>
    </Box>
  )
}

export default ProductByCategory
