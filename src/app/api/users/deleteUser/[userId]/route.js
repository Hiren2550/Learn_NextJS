import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  try {
    const ID = params.userId;
    const res = await User.findByIdAndDelete(ID);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
};
