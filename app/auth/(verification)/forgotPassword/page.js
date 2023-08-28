"use client";
import React from 'react';
import { useTheme } from '@emotion/react';
import { Box, Button, Container, TextField, Typography, IconButton, Link, Divider, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, setDisabledLoading } from '@/store/uiStateSlice/uiStateSlice';
import { useRouter } from 'next/navigation';
import DisabledPageLoader from '@/components/common/Progress/DisabledPageLoader';
import CustomAlert from '@/components/common/Alert';


const ForgotPassword = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const { email } = useSelector(state => state.signin);

  const handleSendResetOtp = async () => {
    dispatch(setDisabledLoading(true));
    router.prefetch('/auth/otpVerification');
    try {
      const response = await fetch('/api/auth/requestOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      console.log(data);
      dispatch(setDisabledLoading(false));
      if (!data.body.success) {
        dispatch(setAlert({ open: true, message: data.body.message, severity: 'warning' }));
        return false;
      }
      dispatch(setAlert({ open: true, message: data.body.message, severity: 'success' }));
      router.push('/auth/otpVerification');

    } catch (error) {
      dispatch(setDisabledLoading(false));
      dispatch(setAlert({ open: true, message: error.message, severity: 'error' }));
    }
  }


  return (
    <Box
      sx={{
        border: `2px solid ${theme.palette.primary.dark}`,
        borderRadius: '10px',
        px: '2rem',
        py: '2rem',
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        minWidth: { xs: '100%', sm: '400px', md: '400px' },
      }}
    >
      <DisabledPageLoader />
      <CustomAlert />
      <Box sx={{ textAlign: 'center', my: 3 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ color: theme.palette.primary.main }}>
          Reset Password
        </Typography>
      </Box>
      <Box>
        <Box sx={{ my: 2 }}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            onChange={(e) => dispatch(setEmail(e.target.value))}
            value={email} />
        </Box>

        <Box sx={{ my: 2 }}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSendResetOtp}>
            Get OTP on Email
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
