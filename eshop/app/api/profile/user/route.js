import { NextResponse } from "next/server";
import { connect } from '@/database/connect'
import Users from '@/models/Users'
import { getUserfromJwt } from '@/utils/auth/auth'


export const PUT = async (request) => {
  try {
    await connect();
    const { ...items } = await request.json();

    const { email } = await getUserfromJwt(request.cookies.get('token').value);

    const user = Users.findOneAndUpdate({ email }, { ...items }, { new: false });

    if (!user) {
      return NextResponse.json({
        status: 400,
        body: { message: 'user not found', success: false }
      });
    }

    return NextResponse.json({
      status: 200,
      body: { message: 'user updated successfully', success: true, data: user }
    });

  } catch (error) {
    console.log("error in updating user: ", error.message);
    return NextResponse.json({
      status: 500,
      body: { message: 'Internal server error', success: false }
    });
  }
}