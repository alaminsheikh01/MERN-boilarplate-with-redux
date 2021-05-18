import express from "express";
const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";
import {
  userRegister,
  userLogin,
  getUserProfile,
} from "../controllers/userControllers.js";

router.post("/signup", userRegister);
router.post("/login", userLogin);
router.get("/profile", protect, getUserProfile);

export default router;
