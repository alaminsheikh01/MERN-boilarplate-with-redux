import express from "express";
const router = express.Router();

import { protect, admin } from "../middleware/authMiddleware.js";
import {
  userRegister,
  userLogin,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserByID,
} from "../controllers/userControllers.js";

router.post("/signup", userRegister);
router.post("/login", userLogin);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/", protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUser);
router.put("/:id", protect, admin, updateUser);
router.get("/:id", protect, admin, getUserByID);

export default router;
