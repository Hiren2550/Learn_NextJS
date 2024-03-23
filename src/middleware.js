import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req) {
  //console.log("middle ware execute");

  const access_token = req.cookies.get("access_token")?.value;
  //console.log(access_token);

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
    "/addTask",
    "/login",
    "/signUp",
    "/profile/:path*",
    "/showTask",
  ],
};
