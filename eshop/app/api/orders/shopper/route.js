import { connect } from "@/database/connect";
import Orders from "@/models/Orders";
import Users from "@/models/Users";
// import Products from "@/models/Products";
import { NextResponse } from "next/server";

async function getOrdersWithShopperId(requestedShopperId) {
  try {
    await connect();
    const orders = await Orders.find({
      'products.shopperId': requestedShopperId
    })
      .populate({
        path: 'products.productId',
        select: 'name price'
      })
      .exec();

    return orders;
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error for further handling
  }
}

export const POST = async (req) => {
  try {
    await connect();
    const { email } = await req.json();
    // error handling pending
    const shopper = await Users.findOne({ email });
    console.log("shopper: ", shopper);
    const orders = await getOrdersWithShopperId(shopper.id);
    return NextResponse.json({
      status: 200,
      body: {
        message: 'Orders retrieved successfully',
        success: true,
        data: orders,
      }
    });

  } catch (error) {
    console.log("error in retrieving orders of user: ", error.message);
    return NextResponse.json({
      status: 500,
      body: {
        message: error.message,
        success: false,
      }
    });
  }
}