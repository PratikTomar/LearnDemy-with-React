import React, { useEffect } from "react";
import "./courseDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store/store";
import Ratings from "../atoms/rating/rating.component";
import { sagaActions } from "../../saga/sagaActions";
import { addItemToCart } from "../../redux/reducer/cart.reducer";
import Loader from "../common/loader/loader.component";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const course = useSelector(
    (state: RootState) => state.courses.selectedCourse
  );
  const cart = useSelector((state: RootState) => state.cart);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const cartItemHandler = () => {
    const cartItemPresent = cart?.find((item) => item.id === course?.id);
    if (!cartItemPresent) {
      dispatch(addItemToCart([course]));
    }
    navigate("/dashboard/cart");
  };

  const buyNowHandler = () => {
    dispatch(addItemToCart([course]));
    navigate("/dashboard/checkout");
  };

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_COURSE_BY_ID, payload: id });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="detail-wrapper">
        <div className="detail-left-wrapper">
          <h1 className="course-title">{course?.title}</h1>
          <div className="course-desc">{course.description}</div>
          <div className="rating-status">
            <p className="badge-status">{course?.badge}</p>
            <Ratings
              ratings={course?.rating || 0}
              reviews={course?.reviews || 0}
            />
          </div>
          <p className="trainer-details">Created by {course?.trainerName}</p>

          <div className="learning-container">
            <h2>What you will Learn</h2>
            <ul className="list-of-learning ">
              <li className="list-items">
                <i className="fa-solid fa-check" />
                <span className="list-items-desc">Complete Project Setup </span>
              </li>
              <li className="list-items">
                <i className="fa-solid fa-check" />
                <span className="list-items-desc">Setup a database</span>
              </li>
              <li className="list-items">
                <i className="fa-solid fa-check" />
                <span className="list-items-desc">
                  {course.title} Development
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="course-detail-right-container">
          <img
            className="course-image"
            alt={`${course?.title} course`}
            src={course?.imageUrl}
          />
          <div className="buy-course-container">
            <div className="course-price">&#8377;{course?.discountedPrice}</div>
            <div className="atc-container">
              <button className="add-to-cart" onClick={cartItemHandler}>
                Add To Cart
              </button>
              <div className="wish-list">
                <div className="wish-list-icon">
                  <i className="fa-regular fa-heart fa-xl" />
                </div>
              </div>
            </div>
            <button onClick={buyNowHandler} className="buy-now">
              Buy now
            </button>
          </div>
        </div>
      </div>
      <div className="black-background"></div>
    </>
  );
}
