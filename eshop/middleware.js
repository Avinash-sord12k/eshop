import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose';

export default async function middleware(request) {
  try {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    console.log("- jwt token: ", token);
    console.log("- url: ", pathname);

    if (token) {
      console.log("- token got: ");
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const decoded = await jwtVerify(token, secret, {
        issuer: "eshop",
        audience: "eshop-users"
      });
      // request.body.user = decoded.payload;

      console.log("- decoded: ", decoded);
      return NextResponse.next();
    }
    else {
      return NextResponse.redirect(process.env.CURRENT_DOMAIN + "/auth/signin");
    }
  } catch (error) {
    console.log("- error: ", error);
    return NextResponse.redirect(process.env.CURRENT_DOMAIN + "/auth/signin");
  }
}
// Supports both a single string value or an array of matchers
export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico|auth/signin|auth/signup).*)',],
}