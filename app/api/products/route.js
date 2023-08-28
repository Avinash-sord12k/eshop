import { connect } from '@/database/connect';
import { NextResponse } from 'next/server';
import Products from '@/models/Products';
import Users from '@/models/Users';
import Roles from '@/models/Roles';
import { getUserfromJwt, isPermitted } from '@/utils/auth/auth';



export const POST = async (request) => {
  try {
    console.log("add new product request: ");
    await connect();
    const { email } = await getUserfromJwt(request.cookies.get('token').value);
    const { name, price, description, image, category, stock, isFeatured, isOnSale } = await request.json();
    console.log("request body: ", {
      name, price, description, image, category, stock, isFeatured, isOnSale
    });

    if (!name || !price || !description || !category || !stock) {
      return NextResponse.json({
        status: 400,
        body: { message: 'Please fill all the fields', success: false }
      });
    }

    const editor = await Users.findOne({ email });
    if (!editor) {
      return NextResponse.json({
        status: 400,
        body: { message: 'Editor not found', success: false }
      });
    }
    const role = await Roles.findOne({ name: editor.role });
    console.log("role is: ", role.permissions);

    const reqPermission = [{
      resource: 'products',
      actions: ['create']
    }];

    const authorized = isPermitted(reqPermission, role.permissions);
    console.log("authorized: ", authorized);

    if (!authorized) {
      return NextResponse.json({
        status: 400,
        body: { message: 'Not permitted', success: false }
      });
    }


    const doesProductExist = await Products.findOne({ name });
    if (doesProductExist) {
      return NextResponse.json({
        status: 400,
        body: { message: 'Product already exists', success: false }
      });
    }

    const product = await Products({
      name,
      price,
      description,
      image,
      category,
      stock,
      shopperId: editor._id,
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
    const { email } = await getUserfromJwt(request.cookies.get('token').value);

    const shopper = await Users.findOne({ email });
    if (!shopper) {
      return NextResponse.json({
        status: 400,
        body: { message: 'Shopper not found', success: false }
      });
    }
    const editor = await Users.findOne({ email });
    if (!editor) {
      return NextResponse.json({
        status: 400,
        body: { message: 'Editor not found', success: false }
      });
    }
    const role = await Roles.findOne({ name: editor.role });
    console.log("role is: ", role.permissions);
    const reqPermission = [{ resource: 'products', actions: ['update'] }];
    const authorized = isPermitted(reqPermission, role.permissions);
    if (!authorized) {
      return NextResponse.json({
        status: 400,
        body: { message: 'Not permitted', success: false }
      });
    }

    const updatedProduct = await Products.findOneAndUpdate({ _id: productId }, updateData, { new: false });

    if (!updatedProduct) {
      return NextResponse.json({
        status: 404,
        body: { message: 'Product not found', success: false }
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
