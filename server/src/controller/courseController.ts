import express, { Request, Response, Router } from "express";
import { Courses } from "../models/course.model";

const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Courses.find({});
    return res.status(200).json({ status: "success", courses });
  } catch (err) {
   return res.status(404).json({
      status: "fail",
      err,
    });
  }
};

const getOneCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await Courses.findOne({ id });
    return res.status(200).json({ status: "success", course });
  } catch (err) {
    return res.status(404).json({
      status: "fail",
      err,

    });

  }
};

export { getCourses, getOneCourse };
