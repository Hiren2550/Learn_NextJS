import { connectDB } from "@/lib/db";
import { Task } from "@/models/Task";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

await connectDB();
export const POST = async (req) => {
  //console.log("Task API");
  try {
    const data = await req.json();
    const token = req.cookies.get("access_token")?.value;
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const task = await new Task({ ...data, userId: user._id });
    const res = await task.save();
    //console.log(res);
    return NextResponse.json(res, {
      status: "200",
      statusText: "Created Task",
    });
  } catch (error) {
    return NextResponse.json(error);
  }
};
export const GET = async (req) => {
  try {
    const res = await Task.find();
    return NextResponse.json(res, { status: "200", statusText: "ALL Tasks" });
  } catch (error) {
    return NextResponse.json(error);
  }
};
