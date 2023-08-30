import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import CardOptions from './CardOptions';
import { Chip, Divider } from '@mui/material';


export default function ProductCard({ product }) {
  let { _id, name, price, descirption, category, image } = product;
  _id = _id.toString();
  product = { _id, name, price, descirption, category, image };

  function internationalNumberSystem(string) {
    string = string.toString().split('.');
    string[0] = string[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    string = string.join('.');
    return string.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <Card sx={{
      borderRadius: 'small',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      '&:hover': {
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        '& .MuiCardMedia-root': {
          transform: 'scale(1.1)',
        }
      },
    }}>
      <CardMedia height={194} sx={{
        objectFit: 'contain',
        padding: '10px',
        transition: 'all 0.2s ease-in-out',
      }} component="img" image={image} alt="Product" />
      <Divider />
      <CardContent sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'flex-start',
      }}>
        <Typography variant="body2" fontWeight={'bold'}>
          {name.length > 30 ? name.slice(0, 30) + '...' : name}
        </Typography>
        {category ? <Chip label={category} color="primary" size="small" /> :
          <Chip label="No Category" color="error" size="small" />}
        {/* <Typography variant="body2" color="text.secondary">
          {descirption}
        </Typography> */}
        <Typography variant="h6" color="text.primary">
          <span style={{ marginRight: '6px' }}>₹</span>
          {internationalNumberSystem(price)}
        </Typography>
        <Rating
          name="product-rating"
          value={4.5}
          precision={0.5}
          size='small'
          readOnly
        />
      </CardContent>
      <Divider></Divider>
      <CardOptions cardData={product} />
    </Card>
  );
}
