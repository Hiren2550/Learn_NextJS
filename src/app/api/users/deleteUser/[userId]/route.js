import { connectDB } from "@/lib/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  await connectDB();
  try {
    const ID = params.userId;
    const res = await User.findByIdAndDelete(ID);
    const response = NextResponse.json({
      res,
      message: "user is deleted",
      success: true,
    });
    response.cookies.delete("access_token");
    return response;
  } catch (error) {
    return NextResponse.json({ message: error, success: false });
  }
};
