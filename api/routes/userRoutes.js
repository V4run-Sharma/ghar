import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  getUserListing,
} from "../controllers/userControllers.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.patch("/update/:id", verifyUser, updateUser);
router.delete("/delete/:id", verifyUser, deleteUser);
router.get("/listings/:id", verifyUser, getUserListing);

export default router;
