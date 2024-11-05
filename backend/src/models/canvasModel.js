import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Verbindung zur zweiten MongoDB-Datenbank herstellen
const canvasConnection = mongoose.createConnection(
  process.env.CANVAS_MONGO_URI
);

const canvasSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  position_x: { type: Number, required: true },
  position_y: { type: Number, required: true },
  color: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Canvas = canvasConnection.model("Canvas", canvasSchema);

export default Canvas;
