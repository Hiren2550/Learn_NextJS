import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  try {
    const ID = params.userId;
    const data = await req.json();

    const res = await User.findByIdAndUpdate(ID, data, { new: true });
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
};
