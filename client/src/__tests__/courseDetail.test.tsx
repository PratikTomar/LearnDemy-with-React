import { render, screen } from "@testing-library/react";
import CourseDetail from "../components/courseDetail/courseDetail";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const initialState = {
  courses: {
    selectedCourse: {
      id: 1,
      title: "React",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzl7cCu8YRM9eY9MXH3iwiz5mVfU_o4AWlo2tt6AIcRg&s",
      trainerName: "Stephen Marek",
      rating: 4.5,
      reviews: 677,
      discountedPrice: 99,
      actualPrice: 129,
      badge: "HighestRated",
      description:
        "This is a beginner friendly  course where you can learn amazing thing about web development and reacts by hands-on",
    },
  },
};

describe("CourseDetail component rendering", () => {
  const mockStore = configureStore();
  let store: any;
  store = mockStore(initialState);
  it("renders course detail Comp", () => {
    render(
      <Provider store={store}>
        <Router>
          <CourseDetail />
        </Router>
      </Provider>
    );
    expect(screen).toMatchSnapshot();
  });

  it("renders course details correctly", () => {
    render(
      <Provider store={store}>
        <Router>
          <CourseDetail />
        </Router>
      </Provider>
    );
    expect(screen.getByText("What you will Learn")).toBeInTheDocument();
    expect(screen.getByText("Complete Project Setup")).toBeInTheDocument();
    expect(screen.getByText("Setup a database")).toBeInTheDocument();
  });
});
