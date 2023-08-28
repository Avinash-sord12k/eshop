import { NextResponse } from "next/server";

export const GET = (req) => {
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Headers:", req.headers);
  console.log("Query Parameters:", req.query);
  console.log("Cookies:", req.cookies);

  return NextResponse.json({
    message: "Welcome to This Ecommerce website",
    success: true,
    req: "Logged request details in console"
  });
};


