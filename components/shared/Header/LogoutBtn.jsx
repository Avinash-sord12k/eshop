"use client";
import React from 'react'
import { MenuItem, Typography } from '@mui/material'
import { useDispatch } from 'react-redux';
import { setLogout } from '@/store/authSlice/authSlice';
import { useRouter } from 'next/navigation';

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogOut = async () => {
    const response = await fetch('/api/auth/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'credentials': 'include',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (data.body.success) {
      dispatch(setLogout());  
      router.push('/auth/signin');
    }
  };

  return (
    <MenuItem onClick={handleLogOut}>
      <Typography textAlign="center">logout</Typography>
    </MenuItem>
  )
}

export default LogoutBtn
