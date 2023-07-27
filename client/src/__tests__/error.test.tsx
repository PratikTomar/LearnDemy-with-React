import React from "react";
import { render, screen } from "@testing-library/react";
import Error from "../components/error/error.component";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { UserModel } from "../models/user.model";
import configureStore from "redux-mock-store";

describe("Error component", () => {
  const initialState = {
    auth: {
      isUserAuthenticated: true,
    },
    cart: {
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
  };
  const mockStore = configureStore();
  let store: any;
  store = mockStore(initialState);
  test("renders header", () => {
    render(
      <Provider store={store}>
        <Router>
          <Error />
        </Router>
      </Provider>
    );
    console.log(screen);

    expect(screen).toMatchSnapshot();
  });

  test("renders not found image", () => {
    render(
      <Provider store={store}>
        <Router>
          <Error />
        </Router>
      </Provider>
    );

    const imageElement = screen.getByAltText("Page Not Found");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toContain("404.png");
  });
});
