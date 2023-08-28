import { connect } from "@/database/connect";
import Roles from "@/models/Roles";
import { NextResponse } from "next/server";

export const DELETE = async (request) => {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json({
        status: 400,
        body: {
          success: false,
          message: "Please provide the role name"
        }
      });
    }

    await connect();

    const role = await Roles.findOne({ name });

    if (!role) {
      return NextResponse.json({
        status: 404,
        body: {
          success: false,
          message: "Role not found"
        }
      });
    }

    // Delete the role
    await role.remove();
    return NextResponse.json({
      status: 200,
      body: {
        success: true,
        message: "Role deleted successfully",
        role: role
      }
    });

  } catch (error) {
    console.log("Error in deleting role: ", error.message);
    return NextResponse.error(new Error('Internal server error'));
  }
};