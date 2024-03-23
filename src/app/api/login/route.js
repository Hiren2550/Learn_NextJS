import { User } from "@/models/user";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { email, password } = await req.json();
  try {
    const user = await User.findOne({ email: email });
    if (user === null) {
      throw new Error("user is not found");
    }
    const match = bcryptjs.compareSync(password, user.password);
    if (!match) {
      throw new Error("wrong credentials !!");
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
    //console.log(token);
    const response = NextResponse.json({
      data: user,
      message: "Logged In",
      success: true,
    });
    response.cookies.set("access_token", token, {
      expiresIn: "1d",
      httpOnly: true,
      secure: false,
    });
    response.cookies.set("current_User", user._id, {
      expiresIn: "1d",
      httpOnly: true,
      secure: false,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      {
        status: "500",
      }
    );
  }
}
