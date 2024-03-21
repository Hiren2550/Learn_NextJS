import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    console.log(params.userId);
    const ID = params.userId;

    const res = await User.findById(ID).select("-password");
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
};
