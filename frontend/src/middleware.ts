import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { Secret } from "jsonwebtoken";

// Define the structure of your JWT payload
interface DecodedToken {
  id: string;
  email: string;
  role: "ADMIN" | "VENDOR" | "CUSTOMER";
  name: string;
  vendor?: object | null;
  customer?: object | null;
}

// Secret key for JWT validation
const secretKey = process.env.NEXT_JWT_SECRET as Secret;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/signup", "/api/public"];

  // Skip middleware for public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Get token from cookies
  const token = req.cookies.get("token")?.value;

  if (!token) {
    // Redirect to login if no token is found
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, secretKey) as DecodedToken;

    // Role-based access control
    if (pathname.startsWith("/admin") && decoded.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    if (pathname.startsWith("/vendor") && decoded.role !== "VENDOR") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    if (pathname.startsWith("/customer") && decoded.role !== "CUSTOMER") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Add decoded user data to headers if needed
    const response = NextResponse.next();
    response.cookies.set("x-user", JSON.stringify(decoded), { httpOnly: true });
    return response;
  } catch (err) {
    console.error("JWT verification failed:", err);

    // Redirect to login for invalid token
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Matcher configuration for protected routes
export const config = {
  matcher: [
    "/admin/:path*",
    "/vendor/:path*",
    "/customer/:path*",
    "/api/protected/:path*",
  ],
};
