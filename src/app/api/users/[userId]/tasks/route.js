import { Task } from "@/models/Task";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { userId } = params;
  try {
    const user = await User.findById(userId);
    const res1 = user._doc;
    const res2 = await Task.find({ userId: userId });
    const res = { ...res1, ...res2 };
    return NextResponse.json(res, {
      status: 200,
      statusText: "Task with Particular user",
    });
  } catch (error) {
    return NextResponse.json(error);
  }
};
