import { Fragment, useEffect } from "react";
import MetaData from "../layouts/MetaData";
import {
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateShipping } from "./shipping";
import axios from "axios";
import { toast } from "react-toastify";
import { createOrder } from "../../actions/orderActions";
import { clearorderError } from "../../slices/orderSlices";

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rawOrderInfo = sessionStorage.getItem("orderInfo");
  const orderInfo = rawOrderInfo ? JSON.parse(rawOrderInfo) : null;

  const { user } = useSelector((state) => state.authState);
  const { items: cartItems, shippingInfo } = useSelector((state) => state.cartState);
  const {error:ordererror}=useSelector(state=>state.orderState);
  useEffect(() => {
    if (!orderInfo || !orderInfo.totalPrice) {
      toast.error("Session expired or invalid order. Redirecting...");
      navigate("/cart");
      return;
    }
    validateShipping(shippingInfo, navigate);
    if(ordererror){
      toast(ordererror,{
        type:"error",position:'bottom-center',onOpen:()=>{dispatch(clearorderError())}
      })
    }
  }, [orderInfo, shippingInfo, navigate]);

  if (!orderInfo || !orderInfo.totalPrice) return null;

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
    shipping: {
      name: user.name,
      address: {
        city: shippingInfo.city,
        postal_code: shippingInfo.postalCode,
        country: shippingInfo.country,
        state: shippingInfo.state,
        line1: shippingInfo.address
      },
      phone: shippingInfo.phoneno
    }
  };

  const order = {
    orderItems: cartItems,
    shippingInfo,
    itemsPrice: orderInfo.itemsPrice,
    shippingPrice: orderInfo.shippingPrice,
    taxPrice: orderInfo.taxPrice,
    totalPrice: orderInfo.totalPrice
  };

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;

    try {
      const { data } = await axios.post("/api/v1/payment/process", paymentData);
      const clientSecret = data.client_secret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email
          }
        }
      });

      if (result.error) {
        toast(result.error.message, { position: "bottom-center", type: "error" });
        document.querySelector("#pay_btn").disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          toast("Payment success!", { type: "success", position: "bottom-center" });
          order.paymentInfo={
            id: result.paymentIntent.id,
            status:result.paymentIntent.status
          }
        dispatch(createOrder(order))
          navigate("/order/success");
        } else {
          toast("Payment failed. Please try again.", { type: "warning", position: "bottom-center" });
        }
      }
    } catch (error) {
      toast(error.response?.data?.message || "Payment failed", {
        type: "error",
        position: "bottom-center"
      });
      document.querySelector("#pay_btn").disabled = false;
    }
  };

  return (
    <Fragment>
      <MetaData title={"Payment"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={onsubmitHandler}>
            <h1 className="mb-4">Card Info</h1>

            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement id="card_num_field" className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement id="card_exp_field" className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement id="card_cvc_field" className="form-control" />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pay - ${orderInfo.totalPrice}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
