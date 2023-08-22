import { NextResponse } from "next/server";
import Orders from "@/models/Orders";
import { connect } from "@/database/connect";


export const GET = async (req) => {
  try {
    await connect();
    const id = response.params.orderId;
    const order = await Orders.find({ id });
    return NextResponse.json({
      status: 200,
      body: {
        message: 'Orders retrieved successfully',
        success: true,
        data: order,
      }
    });
  } catch (error) {

  }

}