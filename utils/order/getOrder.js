import { connect } from '@/database/connect';
import Orders from '@/models/Orders';
import Products from '@/models/Products';

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
      .exec();

    orders.forEach(order => console.log("order: ", JSON.stringify(order.product), "\n\n"));
    orders = orders.map(order => {
      order.products = order.products.filter(product => product.shopperId == requestedShopperId);
      // order.totalAmount = order.products.reduce((acc, product) => acc + (product.productId.price) * product.quantity, 0);
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

export async function getOrdersWithUserId(requestedShopperId) {
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

    // orders.map(order => {
    //   order.totalAmount = order.products.reduce((acc, product) => acc + product.productId.price * product.quantity, 0);
    //   return order
    // })

    orders.sort((a, b) => {
      return new Date(b.orderDate) - new Date(a.orderDate);
    });

    return orders;
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error for further handling
  }
}