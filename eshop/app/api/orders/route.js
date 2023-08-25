import { NextResponse } from "next/server";
import Orders from "@/models/Orders";
import Users from "@/models/Users";
import { connect } from '@/database/connect';

export const POST = async (req) => {
  try {
    await connect();
    const { email, products, totalAmount } = await req.json();
    if (!email || (!products || !products.length) || !totalAmount)
      return NextResponse.json({
        status: 400,
        body: { message: 'email, products and totalAmount are required', success: false, }
      });

    const user = await Users.findOne({ email });
    const userId = user.id;

    const order = new Orders({
      userId,
      products,
      totalAmount,
      status: 'pending',
    });

    await order.save();

    // return NextResponse.redirect('/orders');
    // for now we will return a json response for testing
    return NextResponse.json({
      status: 200,
      body: {
        success: true,
        message: "Order placed successfully."
      }
    });

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
  try {
    const { id, update } = await req.json();
    if (!id) return NextResponse.json({
      status: 400,
      body: {
        message: 'id is required',
        success: false,
      }
    });
    if (!(Object.keys(update).length)) {
      return NextResponse.json({
        status: 400,
        body: {
          message: 'update is required',
          success: false,
        }
      });
    }
    const order = await Orders.findOneAndUpdate({ id }, { update }, { new: false });
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