import mongoose from "mongoose";

export async function dbConnect() {
  try {
    let conn = await mongoose.connect(String(process.env.DATABASE_URI));
    return conn;
  } catch (e) {
    throw new Error("Could not connect.");
  }
}