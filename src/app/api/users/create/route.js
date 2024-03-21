import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const data = await req.json();
    const user = new User(data);
    const res = await user.save();
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
