import { connect } from "@/database/connect";
import { NextResponse } from "next/server";
import Users from "@/models/Users";
import bcrypt from "bcrypt";


connect();
export const POST = async (request) => {
  try {
    const { email, otp, password } = await request.json();
    if (!email || !otp || !password) {
      return NextResponse.json({
        status: 400,
        body: {
          message: "Email and OTP are required",
          success: false,
        }
      });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return NextResponse.json({
        status: 400,
        body: {
          message: "Email is not registered",
          success: false,
        }
      });
    }
    console.log(typeof otp, typeof user.resetOtp);
    if (parseInt(user.resetOtp) !== parseInt(otp)) {
      return NextResponse.json({
        status: 400,
        body: {
          message: "Invalid OTP",
          success: false,
        }
      });
    }

    if (user.resetOtpExpiry < Date.now()) {
      return NextResponse.json({
        status: 400,
        body: {
          message: "OTP expired",
          success: false,
        }
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    user.resetOtp = null;
    user.resetOtpExpiry = null;
    user.password = hashedPassword;

    await user.save();

    return NextResponse.json({
      status: 200,
      body: {
        success: true,
        message: "OTP verified succesfully.",
      }
    });

  } catch (error) {
    console.log("Error is occuring: ", error.message);
  }
};