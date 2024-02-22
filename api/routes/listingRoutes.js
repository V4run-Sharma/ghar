import express from "express";
import {
  createListing,
  deleteListing,
} from "../controllers/listingControllers.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, createListing);
router.delete("/delete/:id", verifyUser, deleteListing);

export default router;
