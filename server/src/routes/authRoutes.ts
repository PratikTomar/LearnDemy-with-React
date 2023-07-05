import express, { Request, Response } from "express";
const router = express.Router();
import { loginUser, signupUser, getUserData } from '../controller/authController';

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/user/userData/:id", getUserData);

export default router;