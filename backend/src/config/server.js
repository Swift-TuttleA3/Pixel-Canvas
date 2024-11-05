import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import routes from "../routes/userRoutes.js";
import canvasRoutes from "../routes/canvasRoutes.js";
import errorHandler from "../middleware/errorMiddleware.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:27017",
  "http://localhost:5173",
  "http://localhost:5000",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api", routes);
app.use("/api/canvas", canvasRoutes);
app.use(errorHandler);
app.use(express.static("public")); // Statische Dateien im Ordner "public" bereitstellen

export default app;
