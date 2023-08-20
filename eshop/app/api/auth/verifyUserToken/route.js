import { connect } from "@/database/connect";
import { NextResponse } from "next/server";
import Users from "@/models/Users";

connect();
export const POST = async (req) => {
  try {
    const { email, token } = await req.json();
    console.log("This user want to verify: ", email, token);
    if (!email || !token) return NextResponse.json({
      status: 400,
      body: {
        message: "Email and token are required",
        success: false
      },
    });

    const user = await Users.findOne({ email });
    if (!user) return NextResponse.json({
      status: 404,
      body: {
        message: "User not found",
        success: false
      },
    });

    console.log(user.verificationToken, token);
    // console.log("user is: ", user);

    if (user.verificationToken !== token) return NextResponse.json({
      status: 400,
      body: {
        message: "Invalid token",
        success: false
      },
    });


    if (user.verificationTokenExpiry < Date.now()) return NextResponse.json({
      status: 400,
      body: {
        message: "Token expired",
        success: false
      },
    });

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiry = null;

    
    await user.save();
    
    console.log("+  user verified: ", user);

    return NextResponse.json({
      status: 200,
      body: {
        message: "Email verified successfully",
        success: true
      },
    });


  } catch (error) {
    console.log("error is occuring: ", error);
  }
}