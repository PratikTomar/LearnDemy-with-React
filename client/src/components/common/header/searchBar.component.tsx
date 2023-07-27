
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { CourseModel } from "../../../models/course.model";
import { searchCourses } from "../../../redux/reducer/search.reducer";
import "./searchBar.css";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const courses = useSelector((state: RootState) => state.courses);
  useEffect(() => {
    let coursesSearched: CourseModel[] =[];
    coursesSearched=courses?.courses.filter(
      (item: CourseModel) =>
        item.title.toLowerCase().includes(inputValue.toLowerCase())
    );

    dispatch(searchCourses(coursesSearched));
    
  }, [inputValue, courses]);

  const handleInputChange  = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <input
      className="search-bar"
      type="text"
      value={inputValue}
      placeholder="Search your courses"
      onChange={handleInputChange }
    />
  );
}

export default SearchBar;