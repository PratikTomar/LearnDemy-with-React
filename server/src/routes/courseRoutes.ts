import express, { Request, Response } from "express";
import { getCourses, getOneCourse } from "../controller/courseController";
import { isAuthenticated } from "../middleware/authMiddleware";
const router = express.Router();

router.get("/courses", isAuthenticated, getCourses);
router.get("/courseDetail/:id", isAuthenticated, getOneCourse);

export default router;
