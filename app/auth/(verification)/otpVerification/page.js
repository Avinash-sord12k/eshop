"use client";
import React from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert, setDisabledLoading } from '@/store/uiStateSlice/uiStateSlice'
import { useRouter } from 'next/navigation'
import DisabledPageLoader from '@/components/common/Progress/DisabledPageLoader'
import CustomAlert from '@/components/common/Alert'
import { setOtp, setPassword, setShowPassword } from '@/store/signinSlice/signinSlice'
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const OtpVerification = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { otp, email, password, showPassword } = useSelector((state) => state.signin)

  const VerifyOtp = async () => {
    try {
      dispatch(setDisabledLoading(true))
      router.prefetch('/auth/signin')
      const response = await fetch('/api/auth/verifyOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp, email, password })
      });
      const data = await response.json();
      console.log(data);
      dispatch(setDisabledLoading(false))
      if (!data.body.success) {
        dispatch(setAlert({ open: true, message: data.body.message, severity: 'warning' }))
        return false
      }
      dispatch(setAlert({ open: true, message: data.body.message, severity: 'success' }))
      router.push('/auth/signin');
    } catch (error) {
      dispatch(setDisabledLoading(false))
      dispatch(setAlert({ open: true, message: error.message, severity: 'error' }))
      console.log(error);
    }
  }

  return (
    <Box
      sx={{
        border: `2px solid primary.dark}`,
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
        <Typography variant="h5" fontWeight="bold" sx={{ color: 'primary.main' }}>
          Enter OTP
        </Typography>
      </Box>
      <Box>
        <Box sx={{ my: 4 }}>
          <TextField
            id="otp"
            label="OTP"
            variant="outlined"
            type='number'
            fullWidth
            onChange={(e) => dispatch(setOtp(e.target.value))}
            value={otp} />
        </Box>
        <Box sx={{ my: 4 }}>
          <TextField
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            onChange={(e) => dispatch(setPassword(e.target.value))}
            value={password}
            InputProps={{
              endAdornment: (
                <IconButton aria-label="toggle password visibility" onClick={() => dispatch(setShowPassword(!showPassword))} edge="end">
                  {!showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              ),
            }}
          />
        </Box>

        <Box sx={{ my: 4 }}>
          <Button variant="contained" color="primary" fullWidth onClick={VerifyOtp}>
            Verify OTP
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default OtpVerification
