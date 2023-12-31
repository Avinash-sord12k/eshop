import ShopperOrderBox from '@/components/specific/shop/orders/ShopperOrderBox/ShopperOrderBox'
import { Box, Paper, Typography } from '@mui/material';
import React from 'react'
import { connect } from '@/database/connect'
import Users from '@/models/Users'
import { cookies } from 'next/headers';
import { getUserfromJwt } from '@/utils/auth/auth';
import Orders from '@/models/Orders';
import Products from '@/models/Products';
import NotFound from '@/components/common/Erros/NotFound';
// import { getOrdersWithShopperId } from '@/utils/order/getOrder';


export default async function OrdersPage() {
  const token = cookies().get('token').value;
  try {
    const { email } = await getUserfromJwt(token);
    await connect();
    const shopper = await Users.findOne({ email });
    const orders = await getOrdersWithShopperId(shopper.id);
    // orders.forEach((order, index) => console.log(`order: ${index}`, JSON.stringify(order), "\n\n"));

    return (
      <Box>
        <Typography mt={4} textAlign={'right'} variant={'h1'} pl={'20px'}>Orders</Typography>
        <Box sx={{
          my: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}>
          {orders.length > 0 ? orders.map((order, index) => (
            <ShopperOrderBox order={order} key={index} />
          )) : <NotFound />}
        </Box>
      </Box>
    )
  } catch (error) {
    console.error("Error in OrdersPage: ", error);
    return <NotFound />
  }
}

export async function getOrdersWithShopperId(requestedShopperId) {
  try {
    await connect();
    let orders = await Orders.find({
      'products.shopperId': requestedShopperId
    })
      .populate({
        path: 'products.productId',
        select: 'name price image'
      })
      .populate({
        path: 'userId',
        select: '_id username email address contactPhone'
      })
      .exec();
    orders = orders.map(order => {
      order.products = order.products.filter(product => product.shopperId == requestedShopperId);
      order.totalAmount = order.products.reduce((acc, product) => acc + (product.productId.price) * product.quantity, 0);
      return order
    });

    orders.sort((a, b) => {
      return new Date(b.orderDate) - new Date(a.orderDate);
    });

    return orders;
  } catch (err) {
    console.error("Error in getOrdersWithShopperId: ", err);
    throw err;
  }
}