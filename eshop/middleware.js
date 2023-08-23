import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose';

export default async function middleware(request) {
  try {
    console.log("___middleware invoked")
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    console.log("- jwt token: ", Boolean(token));
    console.log("- url: ", pathname);

    if (token) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const decoded = await jwtVerify(token, secret, {
        issuer: "eshop",
        audience: "eshop-users"
      });
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("User", JSON.stringify(decoded.payload));

      return NextResponse.next({
        headers: requestHeaders,
      })
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