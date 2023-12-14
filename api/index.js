import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();

//---------------------------------------------------------------------------------------
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
//---------------------------------------------------------------------------------------

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
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
//---------------------------------------------------------------------------------------
