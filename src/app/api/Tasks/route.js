import { connectDB } from "@/lib/db";
import { Task } from "@/models/Task";
import { NextResponse } from "next/server";

await connectDB();
export const POST = async (req) => {
  //console.log("Task API");
  try {
    const data = await req.json();
    const task = await new Task(data);
    const res = await task.save();
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
