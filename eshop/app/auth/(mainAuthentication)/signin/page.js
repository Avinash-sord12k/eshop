"use client";
import { useTheme } from '@emotion/react';
import { Box, Button, Container, TextField, Typography, Alert } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword } from '@/store/signinSlice/signinSlice';
import { setIsAuth, setUsername, setRole, setPermissions, setEmail as setAuthEmail, setError } from '@/store/authSlice/authSlice'

const Signin = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const { email, password } = useSelector(state => state.signin); // Update the selector name
  const { isAuth, username, role, permissions, error } = useSelector(state => state.auth);
  const [alert, setAlert] = React.useState({
    severity: 'warning',
    open: false,
    message: '',
  });

  const handleSignIn = async (e) => {
    console.log("Sign In");
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
      // console.table(data);
      // console.log(data.body.user);
      // console.table(data.body.user.role);

      if (data.body.success) {
        const { username, role } = data.body.user;
        const { name, permissions } = role;
        console.log({ username, name, permissions });
        dispatch(setIsAuth(true));
        dispatch(setUsername(username));
        dispatch(setRole(name));
        dispatch(setPermissions(permissions));
        dispatch(setAuthEmail(email));
        dispatch(setError(''));
        e.target.blur();
        setAlert({
          severity: 'success',
          open: true,
          message: data.body.message,
        });
      }

      else if (!data.body.success) {
        console.log(data);
        dispatch(setError(data.body.message));
        setAlert({
          severity: (data.status == 400 && 'warning') || (data.status == 500 && 'error'),
          open: true,
          message: data.body.message,
        });
      }
      setTimeout(() => {
        setAlert(oldAlert => { console.log({ open: false, ...oldAlert }); return { ...oldAlert, open: false } });
        if (isAuth) router.push('/');
      }, 3000);

      console.table({ isAuth, username, name, permissions, error });

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
      minWidth: { xs: '100%', sm: "400px", md: "400px" },
    }}>
      <Alert severity={alert.severity || 'warning'}
        sx={{
          position: 'fixed', top: '30px',
          left: '50%',
          transform: (alert.open) ? 'translateY(0) translateX(-50%)' : 'translateY(-300px) translateX(-50%)',
          transition: 'transform 0.5s ease-in-out',
        }}>
        {alert.message}
      </Alert>
      <Box sx={{ textAlign: 'center', my: 3 }}>
        <Typography variant='h5' fontWeight={'bold'} sx={{ color: theme.palette.primary.main }}>Sign In</Typography>
      </Box>
      <Box>
        <Box sx={{ my: 2 }}>
          <TextField id="email" label="Email" variant="outlined" fullWidth onChange={(e) => dispatch(setEmail(e.target.value))} value={email} />
        </Box>
        <Box sx={{ my: 2 }}>
          <TextField id="password" label="Password" type="password" variant="outlined" fullWidth onChange={(e) => dispatch(setPassword(e.target.value))} value={password} />
        </Box>
        <Box sx={{ my: 2 }}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSignIn}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signin;
