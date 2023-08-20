import { connect } from "@/database/connect";
import { NextResponse } from "next/server";
import Users from "@/models/Users";
import Roles from "@/models/Roles";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connect();
export const POST = async (req) => {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({
        status: 400,
        body: {
          message: "Email and password are required",
          success: false,
        },
      });
    }
    const user = await Users.findOne({ email });
    if (!user) {
      return NextResponse.json({
        status: 400,
        body: {
          message: "User not found",
          success: false,
        },
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({
        status: 400,
        body: {
          message: "Invalid credentials",
          success: false,
        },
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    })
    const role = await Roles.findById(user.role);
    const {name, permissions} = role;


    let response = NextResponse.json({
      status: 200,
      body: {
        message: "Login successful",
        success: true,
        token,
        user: { ...user._doc, password: undefined, role: {name, permissions}},
      },
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;

  } catch (error) {
    console.log("Internal server error: ", error.message);
    return NextResponse.json({
      status: 500,
      body: {
        message: "Internal server error",
        success: false,
      }
    });
  }

}
