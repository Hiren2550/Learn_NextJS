import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  4;
  console.log(params);
  return NextResponse.json({ message: "this is for both Id and PostId" });
};
