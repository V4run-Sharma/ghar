import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  await User.create({ username, email, password: hashedPassword });
  res.status(201).json({
    message: "User created successfully",
  });
};
