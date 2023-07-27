import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { getActualDiscountPrices } from "../hooks/actualDiscount";
import { RootState } from "../../redux/store/store";
import "./checkout.css";

const CheckoutPage = () => {
  const cartItem = useSelector((state: RootState) => state.cart);

  const { totalCount, actualTotalCount } = getActualDiscountPrices(cartItem);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data : any) => {
    navigate("/dashboard/checkoutSuccess");
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="checkout-page-container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-container">
          <div className="billing-container">
            <h1>Billing Address</h1>
            <div className="billing-form-container">
              <label htmlFor="countryName" className="check-out-label">
                Country:
              </label>
              <input
                type="text"
                id="countryName"
                className={`form-control-inputs ${
                  errors.countryName && "errors"
                }`}
                {...register("countryName", {
                  required: true,
                  minLength: 5,
                  pattern: /^[a-zA-Z0-9_]+$/,
                })}
                placeholder="ex: INDIA"
                aria-invalid={errors.countryName ? "true" : "false"}
                aria-describedby="countryNameError"
              />
              {errors.countryName && (
                <p id="countryNameError" className="error-message">
                  Please enter a valid country name.
                </p>
              )}
              <label htmlFor="stateName" className="check-out-label">
                State or Origin:
              </label>
              <input
                type="text"
                id="stateName"
                className={`form-control-inputs ${
                  errors.stateName && "errors"
                }`}
                {...register("stateName", { required: true })}
                placeholder="ex: Karnataka"
                aria-invalid={errors.stateName ? "true" : "false"}
                aria-describedby="stateNameError"
              />
              {errors.stateName && (
                <p id="stateNameError" className="error-message">
                  Please enter a state or origin.
                </p>
              )}
            </div>
          </div>
          <div className="payment-method-container">
            <h1>Payment Method</h1>
            <div className="payment-form-container">
              <label htmlFor="cardName" className="check-out-label">
                Name on Card:
              </label>
              <input
                type="text"
                id="cardName"
                className={`form-control-inputs ${errors.cardName && "errors"}`}
                {...register("cardName", { required: true })}
                placeholder="Name on Card"
                aria-invalid={errors.cardName ? "true" : "false"}
                aria-describedby="cardNameError"
              />
              {errors.cardName && (
                <p id="cardNameError" className="error-message">
                  Please enter the name on the card.
                </p>
              )}
              <label htmlFor="cardNumber" className="check-out-label">
                Card Number:
              </label>
               {errors.cardNumber && (
                <p className="error-messsage">
                  number should start with "4" should have 13 digits
                </p>
              )}
              <input
                type="number"
                id="cardNumber"
                className={`form-control-inputs ${
                  errors.cardNumber && "errors"
                }`}
                {...register("cardNumber", {
                  required: true,
                  minLength: 13,
                  pattern: /^4[0-9]{12}(?:[0-9]{3})?$/,
                })}
                placeholder={`${
                  errors.cardNumber
                    ? "Card number should be at least 13 or 16 digits"
                    : "0000 0000 0000 0000"
                }`}
                aria-invalid={errors.cardNumber ? "true" : "false"}
                aria-describedby="cardNumberError"
              />
              {errors.cardNumber && (
                <p id="cardNumberError" className="error-message">
                  Please enter a valid card number.
                </p>
              )}
              <div className="security-container">
                <div className="security-labels-container">
                  <label htmlFor="securityCode" className="check-out-label">
                    Security Code:
                  </label>
                  <input
                    type="number"
                    id="securityCode"
                    className={`form-control-inputs ${
                      errors.securityCode && "errors"
                    }`}
                    {...register("securityCode", { required: true })}
                    placeholder="Security code"
                    aria-invalid={errors.securityCode ? "true" : "false"}
                    aria-describedby="securityCodeError"
                  />
                  {errors.securityCode && (
                    <p id="securityCodeError" className="error-message">
                      Please enter the security code.
                    </p>
                  )}
                </div>
                <div className="security-labels-container">
                  <label htmlFor="expireDate" className="check-out-label">
                    Expiration Date:
                  </label>
                  <input
                    type="date"
                    id="expireDate"
                    className={`form-control-inputs ${
                      errors.expireDate && "errors"
                    }`}
                    {...register("expireDate", { required: true })}
                    placeholder="Expire Date"
                    aria-invalid={errors.expireDate ? "true" : "false"}
                    aria-describedby="expireDateError"
                  />
                  {errors.expireDate && (
                    <p id="expireDateError" className="error-message">
                      Please enter the expiration date.
                    </p>
                  )}
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
            <p>By continuing, you agree to the terms of service.</p>
          </div>
          <button
            className="checkout-button"
            type="submit"
            disabled={hasErrors}
          >
            Complete Checkout
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutPage;