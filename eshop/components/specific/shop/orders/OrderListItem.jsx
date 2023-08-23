"use client";
import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { green, yellow, red } from '@mui/material/colors';

const OrderCardContainer = styled(Card)(({ theme }) => ({
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  marginBottom: theme.spacing(2),
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor: status === 'pending' ? yellow[700] : status === 'cancelled' ? red[700] : green[700],
  color: theme.palette.getContrastText(status === 'cancelled' ? red[700] : green[700]),
  marginRight: theme.spacing(1),
}));

export default function OrderListItem({ order }) {
  const { date, user, products, totalAmount, status } = order;

  return (
    <OrderCardContainer>
      <CardHeader
        avatar={<Avatar alt={user.name} src={user.avatar} />}
        title={user.name}
        subheader={date}
      />
      <CardContent>
        {products.map((product, index) => (
          <div key={index}>
            <Typography variant="body1">
              {product.name} x {product.quantity}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ₹{product.price * product.quantity}
            </Typography>
          </div>
        ))}
        <Divider sx={{ margin: '8px 0' }} />
        <Typography variant="h6" color="text.primary">
          Total Amount: ₹{totalAmount}
        </Typography>
        <StatusChip label={status} status={status} size="small" />
      </CardContent>
    </OrderCardContainer>
  );
}
