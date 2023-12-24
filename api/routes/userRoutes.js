import express from "express";
import { test, updateUser } from "../controllers/userControllers.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.patch("/update/:id", verifyUser, updateUser);

export default router;
