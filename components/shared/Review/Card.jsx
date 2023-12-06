"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { Box, Typography, Rating, Button, IconButton } from '@mui/material';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';

const ReviewCard = ({ review: { name, title, review, rating, userId } }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        borderRadius: 8,
        padding: 2,
        width: 400,
        maxWidth: '90%',
        // margin: 'auto',
        textAlign: 'center',
        wordBreak: 'break-all',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: '600' }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Author: {name}
        <Link href={`/searchUser/${userId}`} passHref>
          <IconButton size="small" color='primary'>
            <LaunchOutlinedIcon />
          </IconButton>
        </Link>
      </Typography>
      <Rating value={rating} readOnly />
      {review.length > 100 ? (
        <Typography variant="body1" sx={{ mb: 1 }}>
          {expanded ? review : `${review.slice(0, 100)}...`}
          {review.length > 100 && (
            <Button onClick={toggleExpand}>
              {expanded ? 'Read Less' : 'Read More'}
            </Button>
          )}
        </Typography>
      ) : (
        <Typography variant="body1" sx={{ mb: 1 }}>
          {review}
        </Typography>
      )}
    </Box>
  );
};

export default ReviewCard;
