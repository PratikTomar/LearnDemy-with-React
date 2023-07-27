import express, { Request, Response } from "express";
import { loginUser, signupUser, getUserData } from '../controller/authController';

const router = express.Router();
router.post("/signup", signupUser);
router.get("/user/userData/:id", getUserData);
router.post("/login", loginUser);


export default router;