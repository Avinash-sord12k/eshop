import React from 'react';
import { Box, Typography, Rating } from '@mui/material';
import Link from 'next/link';

const ReviewCard = ({ review: {
  id,
  title,
  name,
  userId,
  rating,
  review, } }) => {
  return (
    <Box
      sx={{
        padding: 2,
        width: 400,
        maxWidth: 400,
        wordBreak: 'break-all',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: '600' }}>
        {title}
      </Typography>
      <Link href={`/searchUser/${userId}`}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        author: {name}
      </Typography>
      </Link>
      <Rating value={rating} readOnly />
      <Typography variant="body1" sx={{ mb: 1, }}>
        {review.slice(0, 100)}...
      </Typography>
    </Box>
  );
};

export default ReviewCard;
