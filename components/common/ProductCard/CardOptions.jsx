"use client";
import React from 'react'
import { CardActions, IconButton, Button } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ShareIcon from '@mui/icons-material/Share';
import Link from 'next/link';
import { useTheme } from '@mui/material';
import { setAlert } from '@/store/uiStateSlice/uiStateSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomAlert from '@/components/common/Alert'
import { addToWishlist } from '@/store/wishlistSlice/wishlistSlice';


const CardOptions = ({ cardData }) => {
  const theme = useTheme();
  const { _id, } = cardData;
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.wishlist);

  const handleWishlistClick = () => {
    dispatch(setAlert({
      open: true,
      severity: 'success',
      message: 'Added to Wishlist'
    }));
    dispatch(addToWishlist(cardData));
  }

  const handleShareClick = () => {
    navigator.clipboard.writeText(`${window.location.origin}/products/id/${_id}`);
    dispatch(setAlert({
      open: true,
      severity: 'success',
      message: 'Link Copied to Clipboard'
    }));
  }

  return (
    <CardActions disableSpacing>
      <IconButton aria-label="add to wishlist" onClick={handleWishlistClick}>
        <BookmarkAddIcon sx={{
          color: wishlist.find(item => item._id === _id) ?
            theme.palette.primary.main :
            theme.palette.default ,
        }} />
      </IconButton>
      <IconButton aria-label="share" onClick={handleShareClick}>
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
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        }
      }}>More Detils</Link>
    </CardActions>
  )
}

export default CardOptions;

