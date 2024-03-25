import { Task } from "@/models/Task";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { userId } = params;
  try {
    const res = await Task.find({ userId: userId });
    return NextResponse.json({
      res,
      status: 200,
      statusText: "Task with Particular user",
    });
  } catch (error) {
    return NextResponse.json(error);
  }
};
