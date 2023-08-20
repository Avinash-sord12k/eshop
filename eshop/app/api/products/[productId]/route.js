import { connect } from '@/database/connect';
import { NextResponse } from 'next/server';
import Products from '@/models/Products';
import Users from '@/models/Users';
import Roles from '@/models/Roles';


export const GET = async (request, response) => {
  try {
    await connect();
    // console.log("request.url: ", request.url);
    // console.log("response: ", response);
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
    const productId = response.params.productId;

    const deletedProduct = await Products.findOneAndDelete({ _id: productId });

    if (!deletedProduct) {
      return NextResponse.json({
        status: 404,
        body: { message: 'Product not found', success: false }
      });
    }

    const shopper = await Users.findOne({ _id: deletedProduct.shopperId });
    if (!shopper) {
      return NextResponse.json({
        status: 400,
        body: { message: 'Shopper not found', success: false }
      });
    }

    const role = await Roles.findOne({ _id: shopper.role });
    const isPermitted = role.permissions.some(permission =>
      permission.resource === 'products' && permission.actions.includes('delete'));
    if (!isPermitted) {
      return NextResponse.json({
        status: 400,
        body: { message: 'Not permitted', success: false }
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
