import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import CardOptions from './CardOptions';
import { Chip } from '@mui/material';


export default function ProductCard({ product }) {

  let { _id, name, price, descirption, category, image } = product;
  _id = _id.toString();
  product = { _id, name, price, descirption, category, image };

  return (
      <Card sx={{borderRadius: 'small'}}>
      <CardMedia height={194} sx={{
        objectFit: 'contain', 
      }} component="img" image={image} alt="Product" />
      <CardContent >
        <Typography variant="body2" fontWeight={'bold'}>{name}</Typography>
        {category ? <Chip label={category} color="primary" size="small" /> : null}
        <Typography variant="body2" color="text.secondary">
          {descirption}
        </Typography>
        <Typography variant="h6" color="text.primary">
          <span style={{ marginRight: '6px' }}>₹</span>
          {price}
        </Typography>
        <Rating
          name="product-rating"
          value={4.5}
          precision={0.5}
          readOnly
        />
      </CardContent>
      <CardOptions cardData={product} />
    </Card>
  );
}
