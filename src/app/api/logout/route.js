import { NextResponse } from "next/server";

export const POST = async (req) => {
  const response = NextResponse.json({
    message: "user Log out",
    success: true,
  });
  response.cookies.delete("access_token");
  return response;
};
