import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import SignUp from "../components/forms/signup.component";
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

describe("SignUp component", () => {
  const mockStore = configureStore();
  const store = mockStore(initialState);
  it("renders the signup form", () => {
    render(
      <Provider store={store}>
        <Router>
          <SignUp />
        </Router>
      </Provider>
    );

    const nameInput = screen.getByPlaceholderText("Full Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const signUpButton = screen.getByText("Sign Up");
    const logInLink = screen.getByText("Log In");

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
    expect(logInLink).toBeInTheDocument();
  });

  it("submits the signup form with valid data", () => {
    render(
      <Provider store={store}>
        <Router>
          <SignUp />
        </Router>
      </Provider>
    );

    const nameInput = screen.getByPlaceholderText("Full Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const signUpButton = screen.getByText("Sign Up");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(signUpButton);
  });
});
