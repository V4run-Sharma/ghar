import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import path from "path";
dotenv.config();

//---------------------------------------------------------------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
//---------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------
const __dirname = path.resolve();
//---------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------
const app = express();
app.use(express.json());
app.use(cookieParser());
//---------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
//---------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.use(express.static(path.join(__dirname, "client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
//---------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
//---------------------------------------------------------------------------------------
