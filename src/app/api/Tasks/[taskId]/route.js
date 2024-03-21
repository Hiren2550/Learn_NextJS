import { Task } from "@/models/Task";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { taskId } = await params;
    const res = await Task.findById(taskId);
    return NextResponse.json(res, { status: "200", statusText: "get Task" });
  } catch (error) {
    return NextResponse.json(error);
  }
};
export const DELETE = async (req, { params }) => {
  try {
    const { taskId } = await params;
    const res = await Task.findByIdAndDelete(taskId);
    return NextResponse.json(res, { status: "200", statusText: "deleted" });
  } catch (error) {
    return NextResponse.json(error);
  }
};
export const PATCH = async (req, { params }) => {
  try {
    const { taskId } = await params;
    const data = await req.json();
    const res = await Task.findByIdAndUpdate(taskId, data, { new: true });
    return NextResponse.json(res, { status: "200", statusText: "updated" });
  } catch (error) {
    return NextResponse.json(error);
  }
};
export const PUT = async (req, { params }) => {
  try {
    const { taskId } = await params;
    const data = await req.json();
    const res = await Task.findOneAndReplace({ _id: taskId }, data, {
      new: true,
    });
    return NextResponse.json(res, { status: "200", statusText: "replaced" });
  } catch (error) {
    return NextResponse.json(error);
  }
};
