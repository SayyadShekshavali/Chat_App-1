import mongoose from "mongoose";

export const connectDB = async (req, res) => {
  try {
    const conn = await mongoose.connect(process.env.MDB_URI);
    console.log(`mongoDB Connected:${conn.connection.host}`);
  } catch (error) {
    console.log("Error in Connecting MongoDB", error);
    process.exit(1);
  }
};
