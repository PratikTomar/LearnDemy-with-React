import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CartCourses from "../components/courseTile/cartCourseTile.component";
import { deleteItemFromCart } from "../redux/reducer/cart.reducer";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';


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

describe("Cart Courses tile render ", () => {

  const mockStore = configureStore();
  let store: any;
  store = mockStore({});

 it("render the cart courses", ()=> {
  render(
    <Provider store={store}>
    <CartCourses coursedetails={course} />
    </Provider>
  );
  expect(screen).toMatchSnapshot();
 })
  it("renders cart course details correctly", () => {
    render(
      <Provider store={store}>
    <CartCourses coursedetails={course} />
    </Provider>
    );

    const courseTitle = screen.getByText(course.title);
    const trainerName = screen.getByText(`By ${course.trainerName}`);
    const ratings = screen.getByRole("img");
    const discountedPrice = screen.getByText(`₹${course.discountedPrice}`);
    const actualPrice = screen.getByText(`₹${course.actualPrice}`);
    const removeButton = screen.getByText("Remove");

    expect(courseTitle).toBeInTheDocument();
    expect(trainerName).toBeInTheDocument();
    expect(ratings).toBeInTheDocument();
    expect(discountedPrice).toBeInTheDocument();
    expect(actualPrice).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
  });
});


