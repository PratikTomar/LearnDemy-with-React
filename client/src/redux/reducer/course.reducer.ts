import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CourseModel } from "../../models/course.model";

const initialState = {
    courses: [new CourseModel()],
    selectedCourse: new CourseModel(),
  };

export const coursesReducer = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourses: (state, { payload }: PayloadAction<CourseModel[]>) => {
      state.courses=payload
    },
    addSelectedCourse: (state, { payload }: PayloadAction<CourseModel>) => {
        state.selectedCourse = payload;
    },
  },
});

export const { addCourses, addSelectedCourse } =
  coursesReducer.actions;
export default coursesReducer.reducer;
