import express from "express";
import {
  google,
  signin,
  signout,
  signup,
} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.post("/google", google);
router.get("/signout", signout);

export default router;
