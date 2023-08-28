import { connect } from '@/database/connect';
import { NextResponse } from 'next/server';
import Products from '@/models/Products';
import Users from '@/models/Users';
import fs from 'fs';
import { getUserfromJwt } from '@/utils/auth/auth';

export const POST = async (request) => {
  try {
    await connect();
    const { email } = await getUserfromJwt(request.cookies.get('token').value);
    const shopper = await Users.findOne({ email });
    if (!shopper) {
      return NextResponse.json({
        status: 400,
        body: { message: 'Shopper not found', success: false }
      });
    }

    const data = await request.formData();
    const file = data.get('products');
    if (!file) {
      return NextResponse.json({
        status: 400,
        body: { message: 'Products file is required', success: false }
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { products } = JSON.parse(buffer.toString());
    console.log("products: ", products);

    for (let i of products) {
      let { title: name, price, description, image, stock, isFetured, isOnSale } = i;
      console.log(name, price);
      if (!name || !price) {
        return NextResponse.json({
          status: 400,
          body: { message: 'Name and price are required', success: false }
        });
      }
      console.log("line 44 tak chal rha hai");
      let product = new Products({
        name,
        price,
        description: description || 'No description',
        image: image || 'https://via.placeholder.com/150',
        stock: stock || 0,
        isFetured: isFetured || false,
        isOnSale: isOnSale || false,
        shopperId: shopper._id
      });
      await product.save();
      console.log("line 47 tak chal rha hai");
    }

    return NextResponse.json({
      status: 200,
      body: { message: 'Products added successfully', success: true }
    });

  } catch (error) {
    console.log("error in adding products: ", error.message);
    return NextResponse.json({
      status: 500,
      body: { message: 'Internal server error', success: false }
    });
  }
}
