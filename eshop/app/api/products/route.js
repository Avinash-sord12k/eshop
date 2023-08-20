import { connect } from '@/database/connect';
import { NextResponse } from 'next/server';
import Products from '@/models/Products';
import Users from '@/models/Users';
import Roles from '@/models/Roles';
import { getUserfromJwt } from '@/utils/auth/auth';



export const POST = async (request) => {
  try {
    await connect();
    const userId = getUserfromJwt(request.cookies.get('token').value).id;

    const { name, price, description, image, category, stock, shopperId, isFeatured, isOnSale } = await request.json();
    if (!name || !price || !description || !category || !stock || !shopperId) {
      return NextResponse.json({
        status: 400,
        body: { message: 'Please fill all the fields', success: false }
      });
    }
    const doesProductExist = await Products.findOne({ name });
    if (doesProductExist) {
      return NextResponse.json({
        status: 400,
        body: { message: 'Product already exists', success: false }
      });
    }

    const editor = await Users.findOne({ _id: userId });
    if (!editor) {
      return NextResponse.json({
        status: 400,
        body: { message: 'Editor not found', success: false }
      });
    }
    const role = await Roles.findOne({ _id: edotir.role });
    console.log("role is: ", role.permissions);
    const isPermitted = role.permissions.some(permission =>
      permission.resource === 'products' && permission.actions.includes('create'));
    if (!isPermitted) {
      return NextResponse.json({
        status: 400,
        body: { message: 'Not permitted', success: false }
      });
    }
    console.log("is permitted: ", isPermitted);

    const product = await Products({
      name,
      price,
      description,
      image,
      category,
      stock,
      shopperId,
      isFeatured,
      isOnSale
    });

    const savedProduct = await product.save();
    console.log("This is newly added saved product: ", savedProduct);

    return NextResponse.json({
      status: 200,
      body: { message: 'Product added successfully', success: true, data: product }
    });

  } catch (error) {
    console.log("error in adding product: ", error.message);
    return NextResponse.json({
      status: 500,
      body: { message: 'Internal server error', success: false }
    });
  }
}

export const PUT = async (request) => {
  try {
    await connect();
    const { productId, updateData } = await request.json();

    const updatedProduct = await Products.findOneAndUpdate({ _id: productId }, updateData, { new: true });

    if (!updatedProduct) {
      return NextResponse.json({
        status: 404,
        body: { message: 'Product not found', success: false }
      });
    }

    const shopper = await Users.findOne({ _id: updatedProduct.shopperId });
    if (!shopper) {
      return NextResponse.json({
        status: 400,
        body: { message: 'Shopper not found', success: false }
      });
    }

    const role = await Roles.findOne({ _id: shopper.role });
    const isPermitted = role.permissions.some(permission =>
      permission.resource === 'products' && permission.actions.includes('update'));
    if (!isPermitted) {
      return NextResponse.json({
        status: 400,
        body: { message: 'Not permitted', success: false }
      });
    }

    return NextResponse.json({
      status: 200,
      body: { message: 'Product updated successfully', success: true, data: updatedProduct }
    });

  } catch (error) {
    console.log("error in updating product: ", error.message);
    return NextResponse.json({
      status: 500,
      body: { message: 'Internal server error', success: false }
    });
  }
}
