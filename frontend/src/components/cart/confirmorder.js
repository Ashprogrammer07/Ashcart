import { Fragment, useEffect } from "react";
import MetaData from "../layouts/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { validateShipping } from "./shipping";
import 'react-toastify/dist/ReactToastify.css';
import CheckoutSteps from "./checkoutSteps";
export default function ConfirmOrder(){
    const navigate=useNavigate();
    const {items:cartItems,shippingInfo}=useSelector(state=>state.cartState)
    const {user}=useSelector(state=>state.authState)
   const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

const shippingPrice = itemsPrice > 200 ? 0 : 25;

const taxPrice = Number((0.05 * itemsPrice).toFixed(2)); // Correct type

const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2)); // Safe sum


    

    useEffect(() => {
         console.log("Shipping Info:", shippingInfo);

    validateShipping(shippingInfo,navigate);
    
}, []);
        const processPayment=()=>{
            const data={
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            }
            console.log("totalPrice before saving:", totalPrice);

            sessionStorage.setItem('orderInfo',JSON.stringify(data))
            setTimeout(navigate('/payment'),2000)
        }
    return(
        <Fragment>
            <MetaData title={"Confirm Order"}/>
            <CheckoutSteps shipping confirmorder/>
            <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-confirm">

                <h4 className="mb-3">Shipping Info</h4>
                <p><b>Name:</b> {user.name}</p>
                <p><b>Phone:</b> {shippingInfo.phoneno}</p>
                <p className="mb-4"><b>Address:</b> {shippingInfo.address},{shippingInfo.city},{shippingInfo.postalcode},{shippingInfo.state},{shippingInfo.country}</p>
                
                <hr />
                <h4 className="mt-4">Your Cart Items:</h4>
                {cartItems.map(item =>(
                        <Fragment>
                            <hr />
                <div className="cart-item my-1">
                    <div className="row">
                        <div className="col-4 col-lg-2">
                            <img src={item.image} alt="Laptop" height="45" width="65"/>
                        </div>

                        <div className="col-5 col-lg-6">
                            <Link to={`products/${item.product}`}>
                            {item.name}
                            </Link>                        
                            </div>


                        <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                            <p>{item.quantity} x ${item.price} = <b>${item.quantity * item.price}</b></p>
                        </div>

                    </div>
                </div>
                <hr />
                        </Fragment>
                ))}
                

            </div>
			
			<div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${itemsPrice}</span></p>
                        <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
                        <p>Tax:  <span className="order-summary-values">${taxPrice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">${totalPrice}</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={processPayment}>Proceed to Payment</button>
                    </div>
                </div>
			
			
        </div>
        </Fragment>
    )
}