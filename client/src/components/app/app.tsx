import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../forms/login.component";
import SignUp from "../forms/signup.component";
import DashBoard from "../dashboard/dashboard";
import TileContainer from "../courseTile/tileContainer";
import CourseDetail from "../courseDetail/courseDetail";
import Footer from "../common/footer/footer.component";
import CartPage from "../cart/cart.component";
import CheckoutPage from "../checkout/checkout.component";
import CheckoutSuccess from "../checkout/checkoutSuccess.component";
import "../../../src/App.css";
import Error from "../error/error.component";
import ProtectedRoute from "../protectedRoute/protectedRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
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
};

export default App;
