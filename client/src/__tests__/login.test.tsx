import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../components/forms/login.component";

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

describe("Login component", () => {
  const mockStore = configureStore();
  const store = mockStore(initialState);
  it("renders the login form", () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("Log In");
    const signUpButton = screen.getByText("Sign up");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
  });

  it("submits the login form with valid data", () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("Log In");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);
  });
});
