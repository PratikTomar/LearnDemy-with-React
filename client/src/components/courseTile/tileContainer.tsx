import React, { useEffect } from "react";
import CourseTile from "../courseTile/courseTile.component";
import { CourseModel } from "../../models/course.model";
import { useDispatch, useSelector } from "react-redux";
import "./tileContainer.css";
import { sagaActions } from "../../saga/sagaActions";
import { RootState } from "../../redux/store/store";
import { addCourses } from "../../redux/reducer/course.reducer";
import Loader from "../common/loader/loader.component";

const TileContainer = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state: RootState) => state.searchedCourses);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_COURSES_SAGA_ACTION });
    return () => {
      dispatch(addCourses([]));
    };
  }, []);
  if (isLoading) {
   return <Loader />;
  }

  if (courses.courses.length === 0) {
    return <h1 className="no-courses">No courses found</h1>;
  }
  const courseTiles = courses.courses.map((course: CourseModel) => {
    return <CourseTile key={course?.id} course={course} />;
  });

  return <div className="courses-container">{courseTiles}</div>;
};

export default TileContainer;
