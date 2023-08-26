import { Backdrop, Box, Container } from '@mui/material'
import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      minWidth: '100vw',
      backgroundColor: 'white',
    }}>
      {children}
    </Box>
  )
}

export default AuthLayout
