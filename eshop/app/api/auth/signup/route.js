import { connect } from "@/database/connect";
import { NextResponse } from "next/server";
import Users from "@/models/Users";
import Roles from "@/models/Roles";
import bcrypt from "bcrypt";



export const POST = async (request) => {
  try {
    await connect();
    const { username, email, password, role } = await request.json();

    if (!username || !password || !email)
      return NextResponse.json({
        status: 400,
        body: {
          message: 'Please enter all fields',
          success: false,
        }
      });

    const user = await Users.findOne({ email });
    console.log(user);
    if (user) return NextResponse.json({
      status: 400,
      body: {
        success: false,
        message: "User already exists"
      }
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const askedRole = await Roles.findOne({ name: role }) ||
      await Roles.findOne({ name: 'user' });

    const newUser = new Users({
      username,
      email,
      password: hash,
      role: askedRole.name
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      status: 200,
      body: {
        success: true,
        message: "Registered successfully",
        user: { username, email, password }
      }
    });

  } catch (error) {
    console.log("internal server error: ", error.message);
    return NextResponse.json({
      status: 500,
      body: {
        success: false,
        message: "Internal server error"
      }
    });
  }
}