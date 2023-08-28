"use client";
import { useTheme } from '@emotion/react';
import { Box, Button, Chip, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, Link } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, setConfirmPassword, setUsername, setRole } from '@/store/signupSlice/signupSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { setAlert, setDisabledLoading } from '@/store/uiStateSlice/uiStateSlice';
import { Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import DisabledPageLoader from '@/components/common/Progress/DisabledPageLoader';
import CustomAlert from '@/components/common/Alert';


const Signup = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const { email, password, confirmPassword, username, role } = useSelector(state => state.signup);

  const handleSignUp = async () => {
    console.log("Sign Up");
    dispatch(setDisabledLoading(true));
    router.prefetch('/auth/signin');
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          confirmPassword,
          username,
          role,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);
      dispatch(setDisabledLoading(false));
      if (!data.body.success) {
        dispatch(setAlert({
          severity: 'error',
          message: data.body.message,
          open: true,
        }));
        return;
      }
      dispatch(setAlert({
        severity: 'success',
        message: data.body.message,
        open: true,
      }));
      router.push('/auth/signin');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box sx={{
      borderRadius: '10px',
      px: '2rem',
      py: '1rem',
      backgroundColor: '#ffffff',
      maxWidth: '800px',
      border: `2px solid ${theme.palette.primary.main}`,
      boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
    }}>
      <DisabledPageLoader />
      <CustomAlert />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} sx={{
          display: {
            xs: 'none',
            sm: 'flex',
          },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Box sx={{ textAlign: 'center', my: 3 }}>
            <Typography variant='h4' fontWeight='bold' color='primary'>Create an Account</Typography>
            <Typography variant='body1' color='textSecondary'>Get access to your Orders, Wishlist, and Recommendations</Typography>
          </Box>
          <Image src='/illustrations/illustration1.svg' alt='illustration' width={300} height={300} priority={true} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ textAlign: 'center', my: 3 }}>
            <Typography variant='h5' fontWeight='bold' color='primary'>Register</Typography>
          </Box>
          <Box>
            <TextField
              size='small'
              id="username"
              label="Username"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              onChange={(e) => dispatch(setUsername(e.target.value))}
              value={username}
            />
            <TextField
              size='small'
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              value={email}
            />
            <TextField
              size='small'
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              value={password}
            />
            <TextField
              size='small'
              id="confirm-password"
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
              value={confirmPassword}
            />
            <FormControl size='small' fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select labelId="role-label" id="role" label="Role" onChange={(e) => dispatch(setRole(e.target.value))} value={role}>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="shopper">Shopper</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={handleSignUp} fullWidth>
              Sign Up
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <Link href="/auth/signin" color="textPrimary">
                Already registered? Sign in here.
              </Link>
            </Box>
            <Divider>
              <Chip label="OR" variant='outlined' />
            </Divider>
            <Box sx={{ my: 2 }}>
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signup;
