import ShopperOrderBox from '@/components/specific/shop/orders/ShopperOrderBox/ShopperOrderBox'
import { Box, Paper, Typography } from '@mui/material';
import React from 'react'
import { connect } from '@/database/connect'
import Orders from '@/models/Orders'
import Users from '@/models/Users'
import Products from '@/models/Products'

export default async function OrdersPage(request) {
  console.log(request);
  const { email } = request.searchParams;
  await connect();
  const shopper = await Users.findOne({ email });
  const orders = await getOrdersWithShopperId(shopper.id);
  // sort orders by date
  orders.sort((a, b) => {
    return new Date(b.orderDate) - new Date(a.orderDate);
  });

  console.log("orders: ", orders);

  return (
    <Box>
      <Typography mt={4} variant={'h1'} pl={'20px'}>Orders</Typography>
      <Box sx={{
        my: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}>
        {orders.map((order, index) => (
          <ShopperOrderBox order={order} key={index} />
        ))}
      </Box>
    </Box>
  )
}

async function getOrdersWithShopperId(requestedShopperId) {
  try {
    await connect();
    const orders = await Orders.find({
      'products.shopperId': requestedShopperId
    })
      .populate({
        path: 'products.productId',
        select: 'name price image'
      })
      .exec();

    return orders;
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error for further handling
  }
}