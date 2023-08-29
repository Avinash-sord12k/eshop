import { NextResponse } from "next/server";
import { connect } from '@/database/connect'
import Users from '@/models/Users'
import { getUserfromJwt } from '@/utils/auth/auth'

export const PUT = async (request) => {
  try {
    await connect();
    const { ...items } = await request.json();

    console.log({ ...items });

    const { email } = await getUserfromJwt(request.cookies.get('token').value);
    const shopper = await Users.findOne({ email });

    if (!shopper) {
      return NextResponse.json({
        status: 400,
        body: { message: 'Shopper not found', success: false }
      });
    }

    // Filter out empty values from the items object
    const filteredItems = Object.fromEntries(
      Object.entries(items).filter(([key, value]) => value !== "")
    );

    if (Object.keys(filteredItems).length > 0) {
      // Update the user's data only if there are non-empty values
      const updatedShopper = await Users.findOneAndUpdate(
        { email },
        filteredItems,
        { new: true }
      );

      return NextResponse.json({
        status: 200,
        body: { message: 'Shopper updated successfully', success: true, data: {...updatedShopper, password: null} }
      });
    } else {
      return NextResponse.json({
        status: 400,
        body: { message: 'No valid data provided', success: false }
      });
    }

  } catch (error) {
    console.log("error in updating shopper: ", error.message);
    return NextResponse.json({
      status: 500,
      body: { message: 'Internal server error', success: false }
    });
  }
}
