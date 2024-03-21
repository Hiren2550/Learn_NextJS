import { User } from "@/models/user";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL, {
      dbName: "Work_Manager",
    });
    console.log("DB connection successfull!!");

    // const user1 = new User({
    //   name: "hiren",
    //   email: "h12@gmail.com",
    //   password: "h12",
    //   about: "test",
    // });
    // await user1.save();
  } catch (error) {
    console.log("Failed to connect with database");
    console.log(error);
  }
};
