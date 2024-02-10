import express from "express";
import { createListing } from "../controllers/listingControllers.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, createListing);

export default router;