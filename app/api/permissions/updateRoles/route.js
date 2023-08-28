import { connect } from "@/database/connect";
import Roles from "@/models/Roles";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { name, permissions, description } = await request.json();

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

    if (permissions) {
      role.permissions = permissions;
    }
    if (description) {
      role.description = description;
    }

    const updatedRole = await role.save();
    return NextResponse.json({
      status: 200,
      body: {
        success: true,
        message: "Role updated successfully",
        role: updatedRole
      }
    });

  } catch (error) {
    console.log("Error in updating role: ", error.message);
    return NextResponse.error(new Error('Internal server error'));
  }
};