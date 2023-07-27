import React from "react";
import { CourseModel } from "../../models/course.model";
import "./tile.css";
import Ratings from "../atoms/rating/rating.component";
import { Link } from "react-router-dom";
type CourseTileProps = {
  course: CourseModel;
};

const CourseTile = (props: CourseTileProps) => {
  return (
    <div key={props.course.id} className="tile-wrapper">
      <Link to={`/dashboard/coursedetails/${props.course.id}`} className="link">
        <img src={props.course?.imageUrl} alt={props.course?.title} />
        <div className="title">{props.course?.title}</div>
      </Link>
      <div className="trainer-name">{props.course?.trainerName}</div>

      <Ratings ratings={props.course?.rating} reviews={props.course?.reviews} />

      <div className="price-wrapper">
        <div className="discounted-price" aria-label="discounted price">
          &#8377;{props.course?.discountedPrice}
        </div>
        <div className="actual-price" aria-label="actual price">
          <span className="strike-through">
            &#8377;{props.course?.actualPrice}
          </span>
        </div>
      </div>
      <div className="badge">{props.course?.badge}</div>
    </div>
  );
};

export default CourseTile;
