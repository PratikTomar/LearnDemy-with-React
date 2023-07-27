import React from "react";
import { render, screen } from "@testing-library/react";

import SearchBar from "../components/common/header/searchBar.component";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const course = {
  id: 1,
  title: "React",
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzl7cCu8YRM9eY9MXH3iwiz5mVfU_o4AWlo2tt6AIcRg&s",
  trainerName: "Stephen Marek",
  rating: 4.5,
  reviews: 677,
  discountedPrice: 99,
  actualPrice: 129,
  badge: "HighestRated",
  description: "This is a beginner friendly  course where you can learn amazing thing about web development and reacts by hands-on"
};

describe("SearchBar component testing", () => {
  const mockStore = configureStore();
  let store: any;
  store = mockStore(course);
  it("render the search comp", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    expect(screen).toMatchSnapshot();
  });
  it("renders input element", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const inputElement = screen.getByPlaceholderText("Search your courses");

    expect(inputElement).toBeInTheDocument();
  });
});
