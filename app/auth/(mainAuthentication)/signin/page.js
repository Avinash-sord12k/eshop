"use client";
import React from 'react';
import { useTheme } from '@emotion/react';
import { Box, Button, Container, TextField, Typography, IconButton, Link, Divider, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import { setEmail, setPassword, setShowPassword } from '@/store/signinSlice/signinSlice';
import { setAlert, setDisabledLoading } from '@/store/uiStateSlice/uiStateSlice';
import { setLogin } from '@/store/authSlice/authSlice';
import { useRouter } from 'next/navigation';
import DisabledPageLoader from '@/components/common/Progress/DisabledPageLoader';
import CustomAlert from '@/components/common/Alert';


const Signin = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const { email, password, showPassword } = useSelector(state => state.signin);

  const handleSignIn = async (e) => {
    console.log("Sign In");
    dispatch(setDisabledLoading(true));
    router.prefetch('/');
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);

      if (data.body.success) {
        const { username, role } = data.body.user;
        const { image, email, userId } = data.body.user;
        const { name, permissions } = role;
        dispatch(setLogin({ username, role: role.name, image, permissions, email, userId }));
        e.target.blur();
        dispatch(setDisabledLoading(false));
        router.push('/');
      }

      else if (!data.body.success) {
        dispatch(setDisabledLoading(false));
        dispatch(setAlert({ open: true, message: data.body.message, severity: 'error' }));
      }

    } catch (error) {
      dispatch(setAlert({ open: true, message: error.message, severity: 'error' }));
      console.log(error);
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
          Sign In
        </Typography>
      </Box>
      <Box>
        <Box sx={{ my: 2 }}>
          <TextField id="email" label="Email" variant="outlined" fullWidth onChange={(e) => dispatch(setEmail(e.target.value))} value={email} />
        </Box>
        <Box sx={{ my: 2 }}>
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
        <Box sx={{ my: 2 }}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSignIn}>
            Sign In
          </Button>
        </Box>
        <Box sx={{ my: 2 }}>
          <Link href="/auth/forgotPassword" color="textPrimary" onClick={() => dispatch(setDisabledLoading(true))}>
            Forgot password?
          </Link>
        </Box>
        <Divider>
          <Chip label="OR" variant='outlined' />
        </Divider>
        <Box sx={{ my: 4 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={() => dispatch(setAlert({
              severity: 'warning',
              message: 'Google Sign In is not yet implemented',
              open: true,
            }))}
          >
            Continue with Google
          </Button>
        </Box>
        <Box sx={{ my: 2 }}>
          <Link href="/auth/signup" color="textPrimary">
            Not registered yet? Register here.
          </Link>
        </Box>

      </Box>
    </Box>
  );
};

export default Signin;
