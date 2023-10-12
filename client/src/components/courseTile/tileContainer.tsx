import React, { useEffect } from "react";
import CourseTile from "../courseTile/courseTile.component";
import { CourseModel } from "../../models/course.model";
import { useDispatch, useSelector } from "react-redux";
import "./tileContainer.css";
import { sagaActions } from "../../saga/sagaActions";
import { RootState } from "../../redux/store/store";
import { addCourses } from "../../redux/reducer/course.reducer";
import { ShimmerCard } from "../atoms/shimmer/ShimmerCard";

const TileContainer = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state: RootState) => state.searchedCourses);

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_COURSES_SAGA_ACTION });
    return () => {
      dispatch(addCourses([]));
    };
  }, []);

  return (courses.courses.length === 0) ? (
    <ShimmerCard />
  ) : (
    <div className="courses-container">
      {courses.courses.map((course: CourseModel) => {
        return <CourseTile key={course?.id} course={course} />;
      })}
    </div>
  );
};

export default TileContainer;
