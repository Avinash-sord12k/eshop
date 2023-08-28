import ShopperOrderBox from '@/components/specific/shop/orders/ShopperOrderBox/ShopperOrderBox'
import { Box, Paper, Typography } from '@mui/material';
import React from 'react'
import { connect } from '@/database/connect'
import Orders from '@/models/Orders'
import Users from '@/models/Users'
import Products from '@/models/Products'
import { cookies } from 'next/headers';
import { getUserfromJwt } from '@/utils/auth/auth';


export default async function OrdersPage() {
  const token = cookies().get('token').value;
  const { email } = await getUserfromJwt(token);
  await connect();
  const user = await Users.findOne({ email });
  const orders = await getOrdersWithUserId(user.id);

  return (
    <Box>
      <Typography mt={4} textAlign={'right'} variant={'h1'} pl={'20px'}>Orders</Typography>
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



async function getOrdersWithUserId(requestedShopperId) {
  try {
    await connect();
    const orders = await Orders.find({
      'userId': requestedShopperId
    })
      .populate({
        path: 'products.productId',
        select: 'name price image'
      }).
      populate({
        path: 'products.shopperId',
        select: 'name'
      })
      .exec();

    orders.map(order => {
      order.totalAmount = order.products.reduce((acc, product) => acc + product.productId.price * product.quantity, 0);
      return order
    })

    orders.sort((a, b) => {
      return new Date(b.orderDate) - new Date(a.orderDate);
    });

    return orders;
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error for further handling
  }
}
