import React, { useEffect } from "react";
import CourseTile from "../courseTile/courseTile.component";
import { CourseModel } from "../../models/course.model";
import { useDispatch, useSelector } from "react-redux/es/exports";
import "./tileContainer.css";
import { sagaActions } from "../../saga/sagaActions";
import { RootState } from "../../redux/store/store";

export default function TileContainer() {
  const dispatch = useDispatch();
  const courses = useSelector((state: RootState) => state.searchedCourses);

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_COURSES_SAGA_ACTION});
  }, []);

  if (courses.courses.length===0) {
    return <h1 className="no-courses">No courses found</h1>
  }
  const courseTiles = courses.courses.map((course: CourseModel) => {
    // return (courses.courses.length === 0) ? 
    // <div>no courses found</div> : 
     return <CourseTile key={course?.id} course={course} />
  });

  return <div className="courses-container">{courseTiles}</div>;
}
