'use client' // Error components must be Client Components

import { Typography, Box, Button, Paper } from '@mui/material'
import { useEffect } from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Paper sx={{
      mt: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '40vh',
      gap: 2,
    }}>
      <ErrorOutlineIcon color='primary.main' />
      <Typography variant='h5'>
        Something went wrong!
      </Typography>
      <Button
        variant='contained'
        color='primary'
        onClick={
          () => reset()
        }
      >
        Try again
      </Button>
    </Paper>
  )
}