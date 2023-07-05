import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes";
import courseRouter from "./routes/courseRoutes";

dotenv.config();

mongoose.connect(
  process.env.MONGO_CONNECTION_STRING || "",
  {},
);

mongoose.connection.on("open", () => {
  console.log(`DB connected !`);
});

const app: Express = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/", authRouter);
app.use("/", courseRouter);

app.listen(port, () => {
  console.log(`Server running @ port ${port} !`);
});
