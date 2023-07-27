import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { CourseModel } from "../models/course.model";
import CartPage from "../components/cart/cart.component";
import { BrowserRouter as Router } from "react-router-dom";

const initialState = {
    cart: [
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
  };

describe("CartPage component", () => {
    const mockStore = configureStore();
    const store = mockStore(initialState);


  it('testing the DOM element present or not', () => {

    render(
      <Provider store={store}>
        <Router>
        <CartPage />
        </Router>
      </Provider>
    );

    expect(screen).toMatchSnapshot();
    const cart = screen.getByText('Shopping Cart');

    expect(cart).toBeInTheDocument();
  });

  it("renders the total and discount prices correctly", () => {

    render(
        <Provider store={store}>
        <Router>
        <CartPage />
        </Router>
      </Provider>
    );

    const discountPercentage = screen.getByText('Discount: 23.26%');
    const checkoutLink = screen.getByRole('link', { name: 'Checkout' });

    expect(discountPercentage).toBeInTheDocument();
    expect(checkoutLink).toHaveAttribute('href', '/dashboard/checkout')

});
});
