import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
    console.log("Middleware running for:", req.nextUrl.pathname)
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  // Redirect unauthenticated users to the login page
  if (!isAuthenticated && !nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", nextUrl.origin));
  }

  // Allow authenticated users to access all routes
  return NextResponse.next();
});

// Apply middleware to specific paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};