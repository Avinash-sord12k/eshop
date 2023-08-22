import { NextResponse } from "next/server";
import Orders from "@/models/Orders";
import { connect } from '@/database/connect';

export const POST = async (req) => {
  try {
    await connect();
    const { email, products, totalAmount } = await req.json();
    const order = new Orders({
      email,
      products,
      totalAmount,
      status: 'pending',
    });

    await order.save();

    return NextResponse.redirect('/orders');

  } catch (error) {
    console.log("error in create order", error);
    return NextResponse.json({
      status: 500,
      body: {
        message: error.message,
        success: false,
      }
    })
  }
}


export const PUT = async (req) => {
  // refer order schema: above Orders.js link
  try {
    const { id, update } = await req.json();
    if (!id) return NextResponse.json({
      status: 400,
      body: {
        message: 'id is required',
        success: false,
      }
    });
    if (!update) return NextResponse.json({
      status: 400,
      body: {
        message: 'update is required',
        success: false,
      }
    });
    const order = await Orders.findOneAndUpdate({ id }, { update }, { new: true });
    return NextResponse.json({
      status: 200,
      body: {
        message: 'Order updated successfully',
        success: true,
        data: { ...order, id: order._id },
      }
    });
  } catch (error) {
    console.log("error in update order", error);
    return NextResponse.json({
      status: 500,
      body: {
        message: error.message,
        success: false,
      }
    })
  }

}


export const DELETE = async (req) => {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({
      status: 400,
      body: {
        message: 'id is required',
        success: false,
      }
    });
    const deletedOrder = await Orders.findOneAndDelete({ id });
    return NextResponse.json({
      status: 200,
      body: {
        message: 'Order deleted successfully',
        success: true,
        data: { ...deletedOrder, id: deletedOrder._id },
      }
    });
  } catch (error) {
    
  }
    
  }