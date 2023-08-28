import { connect } from "@/database/connect";
import Roles from "@/models/Roles";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { name, permissions, description } = await request.json();

    if (!name || !permissions) {
      return NextResponse.json({
        status: 400,
        body: {
          success: false,
          message: "Please provide all the required fields"
        }
      });
    }
    console.log(name, permissions, description);
    await connect();

    const role = await Roles.findOne({ name });
    if (role) return NextResponse.json({
      status: 400,
      body: {
        success: false,
        message: "Role already exists"
      }
    });

    const newRole = new Roles({
      name,
      permissions,
      description,
    });

    const savedRole = await newRole.save();
    return NextResponse.json({
      status: 200,
      body: {
        success: true,
        message: "Role added successfully",
        role: savedRole
      }
    });

  } catch (error) {
    console.log("Error in adding role: ", error.message);
    return NextResponse.error(new Error('Internal server error'));

  }

}