import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req) {
  //console.log("middle ware execute");

  const access_token = req.cookies.get("access_token")?.value;
  //console.log(access_token);

  if (
    req.nextUrl.pathname === "/api/login" ||
    req.nextUrl.pathname === "/api/users/create"
  ) {
    return;
  }
  const LoggedUserAccessPaths =
    req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signUp";
  if (LoggedUserAccessPaths) {
    if (access_token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    if (!access_token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/api/:path*",
    "/addTask",
    "/login",
    "/signUp",
    "/profile/:path*",
    "/showTask",
  ],
};
