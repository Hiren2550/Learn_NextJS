import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    userId: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);

export const Task =
  mongoose.models.tasks || mongoose.model("tasks", TaskSchema);
