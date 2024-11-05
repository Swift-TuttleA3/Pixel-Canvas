import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

const canvasConnection = mongoose.createConnection(
  process.env.CANVAS_MONGO_URI
);

canvasConnection.on("connected", () => {
  console.log("Canvas MongoDB connected");
});

canvasConnection.on("error", (err) => {
  console.error(`Canvas MongoDB connection error: ${err.message}`);
});

export { connectDB, canvasConnection };
