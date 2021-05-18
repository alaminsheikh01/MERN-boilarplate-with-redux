import express from "express";
const router = express.Router();

import { userRegister } from "../controllers/userControllers.js";

router.post("/signup", userRegister);

export default router;
