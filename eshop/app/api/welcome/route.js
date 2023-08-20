import { NextResponse } from "next/server";

export const GET = (req) => {
  console.log("someone is visiting the site");
  return NextResponse.json({
    message: "Welcome to This Ecommerce website"
  })
}