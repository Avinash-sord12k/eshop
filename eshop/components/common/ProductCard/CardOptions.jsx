"use client";
import React from 'react'
import { CardActions, IconButton, Button } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ShareIcon from '@mui/icons-material/Share';
import Link from 'next/link';


const CardOptions = ({ cardData }) => {

  const { _id,  } = cardData;
  console.log('cardData: ', cardData);
  return (
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
        <BookmarkAddIcon />
      </IconButton>
      <IconButton aria-label="share">
        <ShareIcon />
      </IconButton>
      <Link href={`/product/${_id}`}>More Detils</Link>
    </CardActions>
  )
}

export default CardOptions
