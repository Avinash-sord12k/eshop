"use client";
import { useTheme } from '@emotion/react';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, setConfirmPassword, setUsername, setRole } from '@/store/signupSlice/signupSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const {email, password, confirmPassword, username, role} = useSelector(state => state.signup);

  const handleSignUp =  async () => {
    console.log("Sign Up");
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
      router.push('/auth/signin');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container sx={{
      border: `2px solid ${theme.palette.primary.dark}`,
      borderRadius: '10px',
      px: '2rem',
      py: '1rem',
      backgroundColor: '#ffffff',
      minWidth: { xs: '100%', sm: "400px", md: "600px" },
    }}>
      <Grid container spacing={2}>
        <Grid item xs={0} md={6} sx={{display: {xs: 'none', md: 'flex'}, flexDirection: 'column', alignItems: 'center'}} borderRadius={4}>
          <Box sx={{mt: "30px"}}>
          <Typography textAlign={'center'} variant='h5' fontWeight={'bold'}>Register</Typography>
          <Typography textAlign={'center'} variant='body1'>Get access to your Orders,<br/> Wishlist and Recommendations</Typography>
          </Box>
          <Image src={'/illustrations/illustration1.svg'} alt='illstration' width={300} height={300} style={{width: '100%', height: 'auto', marginTop: 'auto', marginBottom: '30px'}} priority={true}/>
        </Grid>
        <Grid item xs={12} md={6} sx={{background: "white"}}>
          <Box sx={{ textAlign: 'center', my: 3 }}>
          <Typography variant='h5' fontWeight={'bold'} sx={{display: {xs: 'block', md: 'none'}, color: theme.palette.primary.main}}>Register</Typography>
          </Box>
          <div>
            <Box sx={{ my: 2 }}>
              <TextField id="username" label="Username" variant="outlined" fullWidth onChange={(e) => dispatch(setUsername(e.target.value))} value={username}/>
            </Box>
            <Box sx={{ my: 2 }}>
              <TextField id="email" label="Email" variant="outlined" fullWidth onChange={(e) => dispatch(setEmail(e.target.value))} value={email} />
            </Box>
            <Box sx={{ my: 2 }}>
              <TextField id="password" label="Password" type="password" variant="outlined" fullWidth onChange={(e) => dispatch(setPassword(e.target.value))} value={password}/>
            </Box>
            <Box sx={{ my: 2 }}>
              <TextField id="confirm-password" label="Confirm Password" type="password" variant="outlined" fullWidth onChange={(e) => dispatch(setConfirmPassword(e.target.value))} value={confirmPassword}/>
            </Box>
            <Box sx={{ my: 2 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="role-label">Role</InputLabel>
                <Select labelId="role-label" id="role" label="Role" onChange={(e) => dispatch(setRole(e.target.value))} value={role}>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="shopper">Shopper</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ my: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSignUp} fullWidth>
                Sign Up
              </Button>
            </Box>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;
