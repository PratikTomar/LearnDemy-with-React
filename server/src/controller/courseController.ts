import express, { Request, Response, Router } from "express";
import { Courses } from "../models/course.model";

const getCourses = async (req: Request, res: Response) => {
  const courses = await Courses.find({});
  res.json(courses);
};

const getOneCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  const courses = await Courses.findOne({ id });
  res.json(courses);
};

export { getCourses, getOneCourse };
