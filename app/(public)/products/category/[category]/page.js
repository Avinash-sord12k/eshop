import { Box } from '@mui/material'
import React from 'react'
import ProductsWithCategory from '@/components/specific/home/ProductsWithCategory';
import Loading from '@/components/shared/Loading';

const ProductByCategory = ({ params }) => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Box sx={{ mt: "10px" }}>
        <ProductsWithCategory category={params.category} />
      </Box>
    </React.Suspense>
  )
}

export default ProductByCategory
