import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CourseTile from "../components/courseTile/courseTile.component";

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

describe("CourseTile component rendering", () => {
  it("renders course tile", () => {
    render(
      <Router>
        <CourseTile course={course} />
      </Router>
    );
    expect(screen).toMatchSnapshot();
  });

  it("renders course information correctly", () => {
    render(
      <Router>
        <CourseTile course={course} />
      </Router>
    );

    const courseImage = screen.getByAltText(course.title);
    const courseTitle = screen.getByText(course.title);
    const trainerName = screen.getByText(course.trainerName);
    const ratings = screen.getByText(`${course.rating}`);
    const reviews = screen.getByText(`(${course.reviews})`);
    const discountedPrice = screen.getByText(`₹${course.discountedPrice}`);
    const actualPrice = screen.getByText(`₹${course.actualPrice}`);
    const badge = screen.getByText(course.badge);

    expect(courseImage).toBeInTheDocument();
    expect(courseTitle).toBeInTheDocument();
    expect(trainerName).toBeInTheDocument();
    expect(ratings).toBeInTheDocument();
    expect(reviews).toBeInTheDocument();
    expect(discountedPrice).toBeInTheDocument();
    expect(actualPrice).toBeInTheDocument();
    expect(badge).toBeInTheDocument();
  });
});
