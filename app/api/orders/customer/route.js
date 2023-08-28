import { NextResponse } from "next/server";
import Orders from "@/models/Orders";
import Users from "@/models/Users";
import { connect } from '@/database/connect';

export const POST = async (req) => {
  try {
    await connect();
    const { email } = await req.json();
    const id = await Users.findOne({ email });
    const orders = await Orders.find({ userId: id });
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