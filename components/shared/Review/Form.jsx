"use client";
import React, { useState } from 'react';
import { Box, TextField, Rating, Button, Typography, Collapse } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '@/store/uiStateSlice/uiStateSlice';

const ReviewForm = ({ productId }) => {
  const [expanded, setExpanded] = useState(false);

  const email = useSelector(state => state.auth.email);
  const dispatch = useDispatch();
  console.log({ email, productId });
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
    } catch (error) {
      dispatch(setAlert({
        open: true,
        severity: 'error',
        message: error.message ?? 'Something went wrong',
      }))
    } finally {
      setExpanded(false);
    }
  };

  return (
    <Box sx={{
      maxWidth: 400,
      margin: 'auto',
      padding: 2,
      '& form': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
      },
    }}>
      <Typography variant="h5" sx={{ fontWeight: '600', mt: 6 }}>
        Write a Review
      </Typography>
      <Button
        onClick={() => setExpanded(!expanded)}
        endIcon={<ExpandMore />}
        sx={{ mt: 2 }}
      >
        {expanded ? 'Hide Form' : 'Show Form'}
      </Button>
      <Collapse in={expanded}>
        <form onSubmit={handleSubmit}>
          <Rating name="rating" defaultValue={0} precision={0.5} />
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
      </Collapse>
    </Box>
  );
};

export default ReviewForm;
