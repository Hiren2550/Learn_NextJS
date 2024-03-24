import { User } from "@/models/user";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const token = req.cookies.get("access_token")?.value;
  //console.log(token);

  if (token) {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //console.log(data);
    const user = await User.findById(data._id).select("-password");
    return NextResponse.json({
      data: user,
      message: "current User details fetched",
      success: true,
    });
  } else {
    return NextResponse.json({ message: "user not", success: "false" });
  }
};
