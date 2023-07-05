import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../forms/login.component";
import SignUp from "../forms/signup.component";
import CheckAuth from "../CheckAuth/CheckAuth";
import DashBoard from "../Dashboard/dashboard";
import TileContainer from "../courseTile/tileContainer";
import CourseDetail from "../courseDetail/courseDetail";
import Footer from "../common/footer/footer.component";
import CartPage from "../Cart/cart.component";
import CheckoutPage from "../Checkout/checkout.component";
import CheckoutSuccess from "../Checkout/checkoutSuccess.component";
import '../../../src/App.css'
import Error from "../error/error.component";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <CheckAuth>
                <DashBoard />
            </CheckAuth>
            }
          >
            <Route path="" element={<TileContainer />} />
            <Route path="coursedetails/:id" element={<CourseDetail />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="checkoutSuccess" element={<CheckoutSuccess />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
