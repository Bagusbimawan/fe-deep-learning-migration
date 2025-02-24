import { NextRequest, NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
const SECRET_KEY = "bagus"; 

export function middleware(req: NextRequest) {
  // Check if the requested path is in protected routes
  const isProtectedRoute = config.matcher.some(path => {
    if (path.endsWith('*')) {
      const basePath = path.slice(0, -1);
      return req.nextUrl.pathname.startsWith(basePath);
    }
    return req.nextUrl.pathname === path;
  });

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/landing-page", req.url));
  }

  try {
    jwt.verify(token, SECRET_KEY);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/landing-page", req.url));
  }
}

export const config = {
  matcher: [
    "/home",
    "/edit-profile",
    "/profile/*"
  ]
};
