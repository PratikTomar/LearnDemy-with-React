import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { getActualDiscountPrices } from "../hooks/actualDiscount";
import { RootState } from "../../redux/store/store";
import "./checkout.css";

export default function CheckoutPage() {
  const cartItem = useSelector((state: RootState) => state.cart);

  const { totalCount, actualTotalCount } = getActualDiscountPrices(cartItem);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const errorsLength = Object.keys(errors).length;
  const onSubmit = (e: any) => {
    if (errorsLength === 0) {
      navigate("/dashboard/checkoutSuccess");
    }
  };

  return (
    <div className="checkout-page-container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-container">
          <div className="billing-container">
            <h1>Billing Address</h1>
            <div className="billing-form-container">
              <label className="check-out-from-labels">Country:</label>
              <input
                type="text"
                className={`form-control-inputs ${
                  errors.countryName && "errors"
                }`}
                {...register("countryName", {
                  required: true,
                  validate: {
                    minLength: (v) => v.length >= 5,
                    matchPattern: (v) => /^[a-zA-Z0-9_]+$/.test(v),
                  },
                })}
                placeholder="ex: INDIA"
              />
              <label className="check-out-from-labels">State or Origin:</label>
              <input
                type="text"
                className={`form-control-inputs ${
                  errors.stateName && "errors"
                }`}
                {...register("stateName", { required: true })}
                placeholder="ex: Karnataka"
              />
            </div>
          </div>
          <div className="payment-method-container">
            <h1>Payment Method</h1>
            <div className="payment-form-container">
              <label className="check-out-from-labels">Name on Card:</label>
              <input
                type="text"
                className={`form-control-inputs ${errors.cardName && "errors"}`}
                {...register("cardName", { required: true })}
                placeholder="Name on Card"
              />
              <label className="check-out-from-labels">Card Number:</label>
              {errors.cardNumber && (
                <p className="error-message">
                  number should start with "4" should have 13 digits
                </p>
              )}
              <input
                type="number"
                className={`form-control-inputs ${
                  errors.cardNumber && "errors"
                }`}
                {...register("cardNumber", {
                  required: true,
                  validate: {
                    minLength: (v) => v.length >= 5,
                    matchPattern: (v) => /^4[0-9]{12}(?:[0-9]{3})?$/.test(v),
                  },
                })}
                placeholder={`${
                  errors.cardNumber
                    ? "Credit card should be at least 13 or 16 digits"
                    : "0000 0000 0000 0000"
                }`}
              />
              <div className="security-container">
                <div className="security-labels-container">
                  <label className="check-out-from-labels">
                    Security Code:
                  </label>
                  <input
                    type="number"
                    className={`form-control-inputs ${
                      errors.securityCode && "errors"
                    }`}
                    {...register("securityCode", { required: true })}
                    placeholder="Security code"
                  />
                </div>
                <div className="security-labels-container">
                  <label className="check-out-from-labels">
                    Expiration Date:
                  </label>
                  <input
                    type="date"
                    className={`form-control-inputs ${
                      errors.expireDate && "errors"
                    }`}
                    {...register("expireDate", { required: true })}
                    placeholder="Expire Date"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="summery-container">
          <div className="summery-sub-container"></div>
          <div>
            <div>
              <p>Original price: {actualTotalCount} </p>
              <p>After discount: {totalCount}</p>
            </div>
          </div>
          <div>Total:{totalCount}</div>
          <div>
            <p>By continuing you are agreeing to the terms of service</p>
          </div>
          <button className="checkout-button">Complete Checkout</button>
        </div>
      </form>
    </div>
  );
}
