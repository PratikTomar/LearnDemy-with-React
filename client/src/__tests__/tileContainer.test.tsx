import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TileContainer from "../components/courseTile/tileContainer";
import { BrowserRouter as Router } from "react-router-dom";

const initialState = {
  searchedCourses: {
    courses: [
      {
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
    ],
  },
};

describe("TileContainer component", () => {
  const mockStore = configureStore();
  let store: any;
  store = mockStore(initialState);
  it('renders "No courses found" message when no courses are available', () => {
    const initialState = {
      searchedCourses: {
        courses: [],
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Router>
          <TileContainer />
        </Router>
      </Provider>
    );

    const noCoursesMessage = screen.getByText("No courses found");
    expect(noCoursesMessage).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
  });

  it("renders course tiles when courses are available", () => {
    render(
      <Provider store={store}>
        <Router>
          <TileContainer />
        </Router>
      </Provider>
    );

    const courseTitle = screen.getByText("React");
    expect(courseTitle).toBeInTheDocument();
  });
});
