import express from "express";
import {
  test,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.patch("/update/:id", verifyUser, updateUser);
router.delete("/delete/:id", verifyUser, deleteUser);

export default router;
