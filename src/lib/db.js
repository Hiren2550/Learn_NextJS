import mongoose from "mongoose";

const config = {
  isConnect: 0,
};

export const connectDB = async () => {
  if (config.isConnect === 1) {
    return;
  }
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL, {
      dbName: "Work_Manager",
    });
    console.log("DB connection successfull!!");
    //console.log(connection.readyState);
    config.isConnect = connection.readyState;
  } catch (error) {
    console.log("Failed to connect with database");
    console.log(error);
  }
};
