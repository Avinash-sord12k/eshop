import ShopperOrderBox from '@/components/specific/shop/orders/ShopperOrderBox/ShopperOrderBox'
import { Box, Paper, Typography } from '@mui/material';
import React from 'react'
import { connect } from '@/database/connect'
import Orders from '@/models/Orders'
import Users from '@/models/Users'
import Products from '@/models/Products'
import { cookies } from 'next/headers';
import { getUserfromJwt } from '@/utils/auth/auth';
import { getOrdersWithUserId } from '@/utils/order/getOrder';


export default async function OrdersPage() {
  const token = cookies().get('token').value;
  const { username, email, role } = await getUserfromJwt(token);
  await connect();
  const user = await Users.findOne({ email });
  const orders = await getOrdersWithUserId(user.id);

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

