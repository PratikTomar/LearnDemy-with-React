import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutPage from "../components/checkout/checkout.component";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import {BrowserRouter as Router} from 'react-router-dom';

const course = {
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
};

describe("CheckoutPage rendering", () => {
  const mockStore = configureStore();
  let store: any;
  store = mockStore(course);
  it("render checkout page comp", () => {
    render(
      <Provider store={store}>
      <Router>
      <CheckoutPage />
      </Router>
     </Provider>
   
    );
    expect(screen).toMatchSnapshot();
  });
  it("renders checkout form correctly", () => {
    render(
      <Provider store={store}>
      <Router>
      <CheckoutPage />
      </Router>
     </Provider>
     );

    expect(screen.getByLabelText("Country:")).toBeInTheDocument();
    expect(screen.getByLabelText("State or Origin:")).toBeInTheDocument();
    expect(screen.getByLabelText("Name on Card:")).toBeInTheDocument();
    expect(screen.getByLabelText("Card Number:")).toBeInTheDocument();
    expect(screen.getByLabelText("Security Code:")).toBeInTheDocument();
    expect(screen.getByLabelText("Expiration Date:")).toBeInTheDocument();
    expect(screen.getByText("Complete Checkout")).toBeInTheDocument();
  });
});
