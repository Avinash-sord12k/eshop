"use client";
import React from 'react'
import { CardActions, IconButton, Button } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ShareIcon from '@mui/icons-material/Share';
import Link from 'next/link';
import { useTheme } from '@mui/material';


const CardOptions = ({ cardData }) => {
  const theme = useTheme();
  const { _id, } = cardData;
  return (
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
        <BookmarkAddIcon />
      </IconButton>
      <IconButton aria-label="share">
        <ShareIcon />
      </IconButton>
      <Link href={`/products/id/${_id}`} style={{
        textDecoration: 'none',
        color: theme.palette.primary.contrastText,
        padding: '8px 10px',
        borderRadius: '5px',
        marginLeft: 'auto',
        fontSize: '1rem',
        backgroundColor: theme.palette.primary.main,
        ':hover': {
          backgroundColor: theme.palette.primary.dark,
        }
      }}>More Detils</Link>
    </CardActions>
  )
}

export default CardOptions
