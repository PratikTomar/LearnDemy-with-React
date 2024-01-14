import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { Link } from "react-router-dom";
import CartCourses from "../courseTile/cartCourseTile.component";
import { CourseModel } from "../../models/course.model";
import { getActualDiscountPrices } from "../hooks/actualDiscount";
import "./cart.css";
import Loader from "../common/loader/loader.component";

const CartPage = () => {
  const cartItem = useSelector((state: RootState) => {
    return state.cart;
  });
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  console.log(isLoading);
  
  const { totalCount, actualTotalCount } = getActualDiscountPrices(cartItem);
  const discount = actualTotalCount - totalCount;

  const cartIsEmpty = cartItem.length === 0;
  const cartItemData = cartItem.map((item: CourseModel) => (
    <CartCourses key={item.id} coursedetails={item} />
  ));

  if (isLoading) {
    return <Loader />;
  }

  if (cartIsEmpty) {
    return (
      <div className="No-courses-page">
        No items in Cart
        <Link to="/dashboard" className="learning-link">
          Start Learning
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-courses-container">
      <div className="cart-top-container">
        <h1>Shopping Cart</h1>
        <p>
          {cartItem.length} Course{cartItem.length !== 1 && "s"} in the cart
        </p>
      </div>
      <div className="cart-total-courses">
        <div className="cart-lower-container">{cartItemData}</div>
        <div className="total-container">
          <p className="total-key">Total:</p>
          <div className="total-discount-price">&#8377;{totalCount}</div>
          <div className="total-actual-price">
            <div className="strike-through">&#8377;{actualTotalCount}</div>
          </div>
          <p className="discount-price">
            Discount: {((discount / actualTotalCount) * 100).toFixed(2)}%
          </p>
          <Link to="/dashboard/checkout" className="checkout-link">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
