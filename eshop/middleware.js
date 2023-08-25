import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose';
// import { getUserfromJwt, isPermitted } from '@/utils/auth/auth';

// function shouldAllowRequest(pathname, userRole) {
//   if (/^\/shopper/.test(pathname)) {
//     return isPermitted('shopper', userRole);
//   } else if (/^\/user/.test(pathname)) {
//     return isPermitted('user', userRole);
//   } else {
//     return false;
//   }
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
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('user', JSON.stringify(decoded.payload))
      const { email, role } = decoded.payload;
      console.log("url testing with role", role)
      if (/^\/shopper/.test(pathname) && role !== "shopper") {
        console.log("___redirect to signin as shopper");
        console.log("___redirect detials: ", role, pathname, "/shopper");
        return NextResponse.redirect(process.env.CURRENT_DOMAIN + "/auth/signin");
      }
      else if (/^\/user/.test(pathname) && role !== "user") {
        return NextResponse.redirect(process.env.CURRENT_DOMAIN + "/auth/signin");
      }
      else if (/^\/admin/.test(pathname) && role !== "admin") {
        return NextResponse.redirect(process.env.CURRENT_DOMAIN + "/auth/signin");
      }

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        }
      })
    }
    else {
      return NextResponse.redirect(process.env.CURRENT_DOMAIN + "/auth/signin");
    }
  } catch (error) {
    console.log("- error in middleware: ", error);
    return NextResponse.redirect(process.env.CURRENT_DOMAIN + "/auth/signin");
  }
}
export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico|auth/signin|auth/signup).*)',],
}