import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CourseModel } from "../../models/course.model";

const initialState = {
    courses: [new CourseModel()],
    courseById: new CourseModel(),
  };

export const coursesReducer = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (store, { payload }: PayloadAction<CourseModel[]>) => {
      store.courses.push(...payload);
    },
    setCourseById: (store, { payload }: PayloadAction<CourseModel>) => {
        store.courseById = payload;
        return store;
    },
  },
});

export const { setCourses, setCourseById } =
  coursesReducer.actions;
export default coursesReducer.reducer;
