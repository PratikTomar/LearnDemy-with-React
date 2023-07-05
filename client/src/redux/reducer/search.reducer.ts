import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CourseModel } from "../../models/course.model";

const initialState = {
  courses: [new CourseModel()],
};

export const searchCoursesReducer = createSlice({
  name: "searchCoursesReducer",
  initialState,
  reducers: {
    searchCourses: (store, action: PayloadAction<CourseModel[]>) => {
      store.courses = [...action.payload];
      return store;
    },
  },
});

export const { searchCourses } = searchCoursesReducer.actions;
export default searchCoursesReducer.reducer;
