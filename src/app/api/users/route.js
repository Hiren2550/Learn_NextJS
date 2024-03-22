import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { User } from "@/models/user";

export const GET = async (req) => {
  await connectDB();
  try {
    const res = await User.find().select("-password");
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
// export const POST = async (req) => {
//   //console.log(req.body);
//   //console.log(req.method);
//   // console.log(req.nextUrl.pathname);
//   // console.log(req.nextUrl.searchParams);
//   // console.log(req.headers.get("X-Forwarded-For"));
//   console.log(req.json());

//   return NextResponse.json({ message: "POST REQUEST BY USERS" });
// };
export const DELETE = async (req) => {
  return NextResponse.json(
    { message: "DELETE REQUEST BY USERS" },
    { status: 202, statusText: "statuse changed" }
  );
};
