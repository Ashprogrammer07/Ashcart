import { Fragment, useEffect } from "react";
import MetaData from "../layouts/MetaData";
import { ordercompleted } from "../../slices/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
export default function OrderSuccess(){
    const dispatch=useDispatch();
    useEffect(() => {
    dispatch(ordercompleted()); // ✅ Clear only after success page loaded
  }, []);

    return(
        <Fragment>
            <MetaData title={"Order Success"}/>
            <div className="row justify-content-center">
            <div className="col-6 mt-5 text-center">
                <img className="my-5 img-fluid d-block mx-auto" src="/images/success.png" alt="Order Success" width="200" height="200" />

                <h2>Your Order has been placed successfully.</h2>

                <Link to={'/myorders'}>Go to Orders</Link>
            </div>

        </div>
        </Fragment>
    )
}