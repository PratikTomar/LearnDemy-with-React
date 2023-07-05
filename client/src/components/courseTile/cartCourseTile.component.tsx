import { useDispatch } from "react-redux";
import { CourseModel } from "../../models/course.model";
import Ratings from "../atoms/rating/rating.component";
import { deleteItemFromCart } from "../../redux/reducer/cart.reducer";
import "./cartCourseTile.css";

type CourseProps = {
  coursedetails: CourseModel;
};

export default function CartCourses(props: CourseProps) {
  const { coursedetails } = props;
  const dispatch = useDispatch();

  return (
    <div className="cart-course-container">
      <div className="cart-lower-container-course">
        <img
          src={coursedetails.imageUrl}
          alt={coursedetails.title}
          height={"80px"}
          width={"130px"}
        />
        <div className="title-description">
          <p className="cart-course-title title-items">{coursedetails.title}</p>
          <p className="title-items trainer-name">
            By {coursedetails.trainerName}
          </p>
          <Ratings
            ratings={coursedetails.reviews}
            reviews={coursedetails.reviews}
          />
          <p className="trainer-name">{coursedetails.trainerName}</p>
        </div>
        <div className="delete-container">
          <button
            className="remove-cart-item"
            onClick={() => {
              dispatch(deleteItemFromCart(coursedetails));
            }}
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
        <div className="cart-courses-total"></div>
      </div>
    </div>
  );
}
