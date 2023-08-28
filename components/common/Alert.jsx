"use client";
import React from 'react'
import { Alert, Box, Collapse, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '@/store/uiStateSlice/uiStateSlice';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';

const CustomAlert = () => {
  const { alert } = useSelector((state) => state.ui);
  const { open, severity, message } = alert;
  const dispatch = useDispatch();
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        dispatch(setAlert({...alert, open: false, message: '' }));
      }, 3000);
    }
  }, [open]);
  return (
    <Box 
    sx={{
      position: 'fixed',
      top: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      width: '100%',
      maxWidth: '500px',
    }}>
      <Collapse in={open}>
        <Alert elevation={3}
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                dispatch(setAlert({ open: false, severity: 'success', message: '' }));
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  )
}

export default CustomAlert
