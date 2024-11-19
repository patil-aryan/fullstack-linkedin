import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// const connection = await mongoose.connect(process.env.MONGO_URI)

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected at: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
