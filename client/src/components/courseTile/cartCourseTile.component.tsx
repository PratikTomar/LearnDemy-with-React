import { useDispatch } from "react-redux";
import { CourseModel } from "../../models/course.model";
import Ratings from "../atoms/rating/rating.component";
import { deleteItemFromCart } from "../../redux/reducer/cart.reducer";
import "./cartCourseTile.css";

type CourseProps = {
  coursedetails: CourseModel;
};

const CartCourses= (props: CourseProps) => {
  const { coursedetails } = props;
  const dispatch = useDispatch();
  const removeItemHandler = () => {
    dispatch(deleteItemFromCart(coursedetails));
  }

  return (
    <div className="cart-course-container">
      <div className="cart-course-content">
        <img
          src={coursedetails.imageUrl}
          alt={coursedetails.title}
          className="cart-course-image"
        />
        <div className="title-description">
          <p className="cart-course-title title-items">{coursedetails.title}</p>
          <p className="title-items trainer-name">
            By {coursedetails.trainerName}
          </p>
          <Ratings
            ratings={coursedetails.rating}
            reviews={coursedetails.reviews}
          />
          <p className="trainer-name">{coursedetails.trainerName}</p>
        </div>
        <div className="delete-container">
          <button
            className="cart-remove-btn"
            onClick={removeItemHandler}
          >
            Remove
          </button>
        </div>
        <div className="price-container">
          <p className="discount-price">
            &#8377;{coursedetails?.discountedPrice}
          </p>
          <p className="actual-price">
            <span className="strike-through">
              &#8377;{coursedetails?.actualPrice}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartCourses;