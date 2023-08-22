import { connect } from '@/database/connect';
import { NextResponse } from 'next/server';
import Products from '@/models/Products';
import Users from '@/models/Users';
import Roles from '@/models/Roles';
import { getUserfromJwt, isPermitted } from '@/utils/auth/auth';

export const GET = async (request) => {
  try {
    const { email } = await getUserfromJwt(request.cookies.get('token').value);
    const shopper = await Users.findOne({ email });
    const products = await Products.find({ shopperId: shopper._id });
    console.log(products.length);
    return NextResponse.json({
      status: 200,
      body: { products, success: true }
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      body: { message: 'Something went wrong', success: false }
    });
  }
}