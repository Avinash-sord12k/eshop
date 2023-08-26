"use client";
import { Box, LinearProgress } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';

const DisabledPageLoader = () => {
  const { disabledLoading } = useSelector(state => state.ui);
  return (
    <>
      {disabledLoading && <Box sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
        <LinearProgress color="secondary" sx={{
          width: '100%',
        }} />
      </Box>}
    </>
  )
}

export default DisabledPageLoader
