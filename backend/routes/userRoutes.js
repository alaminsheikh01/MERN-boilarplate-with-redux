import express from "express";
const router = express.Router();

import { protect, admin } from "../middleware/authMiddleware.js";
import {
  userRegister,
  userLogin,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userControllers.js";

router.post("/signup", userRegister);
router.post("/login", userLogin);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;
