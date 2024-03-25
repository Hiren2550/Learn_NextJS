import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { jwt } from "jsonwebtoken";
import { connectDB } from "@/lib/db";

export const POST = async (req) => {
  await connectDB();
  try {
    const data = await req.json();
    let { password, name, email, about } = data;
    const hashedPassword = bcryptjs.hashSync(password, 12);
    // console.log("pass", password);
    // console.log(hashedPassword);
    password = hashedPassword;

    const user = new User({ name, email, about, password });
    const res = await user.save();
    return NextResponse.json({
      res,
      message: "Sign Up Sucesss",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
};
