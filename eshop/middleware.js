import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose';

export default async function middleware(request) {
  try {
    console.log("\n\n\n_____middleware invoked_____")
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;
    console.log("- jwt token got: ", Boolean(token));
    console.log("- pathname: ", pathname);

    if (token) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const decoded = await jwtVerify(token, secret, {
        issuer: "eshop",
        audience: "eshop-users"
      });
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('user', JSON.stringify(decoded.payload))
      const role = decoded.payload.role.name;

      console.log("url testing with role", role)
      if (/^\/shopper/.test(pathname) && role !== "shopper") {
        console.log("___redirect to signin as shopper");
        console.log("___redirect detials: ", { role, pathname }, "/shopper");
        return NextResponse.redirect(process.env.CURRENT_DOMAIN + "/auth/signin");
      }
      else if (/^\/user/.test(pathname) && role !== "user") {
        console.log("___redirect to signin as user");
        console.log("___redirect detials: ", { role, pathname }, "/user");
        return NextResponse.redirect(process.env.CURRENT_DOMAIN + "/auth/signin");
      }
      else if (/^\/admin/.test(pathname) && role !== "admin") {
        console.log("___redirect to signin as admin");
        console.log("___redirect detials: ", { role, pathname }, "/admin");
        return NextResponse.redirect(process.env.CURRENT_DOMAIN + "/auth/signin");
      } else console.log("___allow request with role: ", role, "\n\n\n");

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
  matcher: ['/((?!api|_next/static|favicon.ico|auth/signin|auth/signup|illustrations).*)',],
}