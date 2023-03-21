import React, { Fragment, useEffect, useRef, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import {
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import "./Payment.css";
import { useNavigate } from "react-router-dom";
import { clearErrors, createOrder } from '../../actions/orderAction'

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false)

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector(state => state.newOrder)

  const payBtn = useRef(null);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setDisabled(true)
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/process/payment",
        paymentData,
        config
      );
      const client_secret = data.client_secret;
      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setPaymentSuccess(true);
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status
          }
          dispatch(createOrder(order))
          alert.success("Payment Successful, redirecting...")
          setTimeout(() => {
            setPaymentSuccess(false)
            navigate("/placeOrder/success");
          }, 3000);
        } else {
          alert.error("There was some issue while processing payment");
        }
      }
    } catch (error) {
      alert.error("Please Provide Correct Details");
    }
  };

  useEffect(()=>{
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, error, alert])

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      {paymentSuccess ? (
        <Loader />
      ) : (
        <div className="paymentContainer">
          <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
            <Typography>Card Info</Typography>
            <div>
              <CreditCardIcon />
              <CardNumberElement className="paymentInput" />
            </div>
            <div>
              <EventIcon />
              <CardExpiryElement className="paymentInput" />
            </div>
            <div>
              <VpnKeyIcon />
              <CardCvcElement className="paymentInput" />
            </div>
            <button disabled={disabled} type="submit" className="paymentFormBtn" ref={payBtn}>
              {`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            </button>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default Payment;
