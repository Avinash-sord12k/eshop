import { connect } from '@/database/connect';
import { NextResponse } from 'next/server';
import Products from '@/models/Products';
import Users from '@/models/Users';
import Roles from '@/models/Roles';
import { getUserfromJwt, isPermitted } from '@/utils/auth/auth';


export const GET = async (request, response) => {
  try {
    await connect();

    const productId = response.params.productId;
    if (!productId) {
      return NextResponse.json({
        status: 400,
        body: { message: 'Please fill all the fields', success: false }
      });
    }
    const product = await Products.findOne({ _id: productId });

    if (!product) {
      return NextResponse.json({
        status: 404,
        body: { message: 'Product not found', success: false }
      });
    }
    return NextResponse.json({
      status: 200,
      body: { message: 'Product retrieved successfully', success: true, data: product }
    });

  } catch (error) {
    console.log("error in retrieving product: ", error.message);
    return NextResponse.json({
      status: 500,
      body: { message: 'Internal server error', success: false }
    });
  }
}


export const DELETE = async (request, response) => {
  try {
    await connect();

    const { email } = await getUserfromJwt(request.cookies.get('token').value);
    const user = await Users.findOne({ email });
    const role = await Roles.findOne({ name: user.role });
    const reqPermission = [{ resource: 'products', actions: ['delete'] }];
    const authorized = isPermitted(reqPermission, role.permissions);
    if (!authorized) {
      return NextResponse.json({
        status: 400,
        body: { message: 'Not permitted', success: false }
      });
    }

    const productId = response.params.productId;
    const deletedProduct = await Products.findOneAndDelete({ _id: productId });

    if (!deletedProduct) {
      return NextResponse.json({
        status: 404,
        body: { message: 'Product not found', success: false }
      });
    }

    return NextResponse.json({
      status: 200,
      body: { message: 'Product deleted successfully', success: true, data: deletedProduct }
    });

  } catch (error) {
    console.log("error in deleting product: ", error.message);
    return NextResponse.json({
      status: 500,
      body: { message: 'Internal server error', success: false }
    });
  }
}
