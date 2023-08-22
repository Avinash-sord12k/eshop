import { connect } from "@/database/connect";
import { NextResponse } from "next/server";
import Users from "@/models/Users";
import Roles from "@/models/Roles";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";

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

    const role = await Roles.findOne({ name: user.role });
    const { name, permissions } = role;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    console.log(secret);
    const token = await new SignJWT({ email, role: { name, permissions } })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .setIssuer("eshop")
      .setAudience("eshop-users")
      .sign(secret);


    let response = NextResponse.json({
      status: 200,
      body: {
        message: "Login successful",
        success: true,
        token,
        user: { ...user._doc, password: undefined, role: { name, permissions } },
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
