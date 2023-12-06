"use client";
import React, { useState } from 'react';
import { Box, TextField, Rating, Button, Typography, Collapse, Modal } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '@/store/uiStateSlice/uiStateSlice';
import { useRouter, useSearchParams } from 'next/navigation';

const ReviewForm = () => {

  const email = useSelector(state => state.auth.email);
  const dispatch = useDispatch();
  const params = useSearchParams();
  const productId = params.get('writereview');
  const router = useRouter();

  if (!email) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    if (!data.rating || data.rating < 1) {
      return dispatch(setAlert({
        open: true,
        severity: 'error',
        message: 'Please select a rating',
      }))
    }
    if (data.title.length < 5) {
      return dispatch(setAlert({
        open: true,
        severity: 'error',
        message: 'Review title must be at least 5 characters long',
      }))
    }
    if (data.comment.length < 100) {
      return dispatch(setAlert({
        open: true,
        severity: 'error',
        message: 'Review must be at least 100 characters long',
      }))
    }

    const res = await fetch('/api/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, email, productId }),
    })
    let result;
    try {
      result = await res.json();
      dispatch(setAlert({
        open: true,
        severity: 'success',
        message: 'Review submitted successfully',
      }))
    } catch (error) {
      dispatch(setAlert({
        open: true,
        severity: 'error',
        message: error.message ?? 'Something went wrong',
      }))
    } finally {
      if (result) {
        router.back()
      }
    }
  };

  return (
    <Modal
      open={productId}
      onClose={() => router.back()}
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: 4,
        p: 4,
        maxWidth: 400,
        margin: 'auto',
        '& form': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
        },
      }}>
        <Typography variant="h5" sx={{ fontWeight: '600', mt: 6 }}>
          Write a Review
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          Product: {productId}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Rating name="rating" size='medium' defaultValue={0} precision={1} />
          <TextField
            label="Review Title"
            variant="outlined"
            fullWidth
            margin="normal"
            name='title'
          />
          <TextField
            label="Your Review"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            name="comment"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Modal >
  );
};

export default ReviewForm;
