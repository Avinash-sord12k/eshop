import OrderListItem from '@/components/specific/shop/orders/UserOrderBox'
import { Box, Typography } from '@mui/material';
import React from 'react'

const Orders = () => {
  const order = {
    date: '2023-08-20',
    user: {
      name: 'John Doe',
      avatar: 'https://example.com/avatar.jpg', // URL to the user's avatar image
    },
    products: [
      {
        name: 'Product 1',
        quantity: 2,
        price: 50,
      },
      {
        name: 'Product 2',
        quantity: 1,
        price: 30,
      },
    ],
    totalAmount: 130,
    status: 'pending', // 'pending', 'cancelled', or 'delivered'
  };
  
  return (
    <div>
      <Typography mt={4} variant={'h4'} fontWeight={'bold'}>Orders</Typography>
      <Box mr={10} mt={3}>
      <OrderListItem order={order}/>
      </Box>
    </div>
  )
}

export default Orders
